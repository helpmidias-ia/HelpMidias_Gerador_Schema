// Synthetic form/clipboard fixtures. No deployment, database or network access.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync(`${__dirname}/script.js`, 'utf8');
const required = ['projectName', 'defaultDomain', 'apiEvolution', 'n8nEncryptionKey', 'redisKey', 'postgresKey'];

function fixture(overrides = {}) {
  const values = {projectName:'fixture', defaultDomain:'example.invalid', apiEvolution:'synthetic-api',
    n8nEncryptionKey:'synthetic-encryption', redisKey:'synthetic-redis', postgresKey:'synthetic-postgres', email:''};
  Object.assign(values, overrides);
  const fields = Object.fromEntries([...Object.keys(values), 'schemaForm', 'schemaOutput', 'copyButton'].map(id => [id, {
    value:values[id], textContent:'', style:{display:'none'}, listeners:{}, validity:'',
    addEventListener(event, handler) {this.listeners[event] = handler;},
    setCustomValidity(message) {this.validity = message;},
    reportValidity() {return !this.validity;}
  }]));
  const logs = [], alerts = [], clipboard = [];
  vm.runInNewContext(script, {document:{getElementById:id => fields[id]},
    navigator:{clipboard:{writeText:async value => {clipboard.push(value); throw new Error('synthetic clipboard error');}}},
    console:{error:(...args) => logs.push(args)}, alert:message => alerts.push(message)});
  return {fields, logs, alerts, clipboard,
    submit:() => fields.schemaForm.listeners.submit({preventDefault(){}}),
    data:() => JSON.parse(fields.schemaOutput.textContent)};
}

function env(service) {
  return Object.fromEntries(service.data.env.split('\r\n').map(line => {
    const i = line.indexOf('='); return [line.slice(0,i), line.slice(i+1)];
  }));
}

for (const value of ['synthetic/fixture', 'synthetic:@?#%+ value', "ação/🔒!'()*"]) {
  test('password components round-trip through PostgreSQL and Redis URIs', () => {
    const f = fixture({postgresKey:value, redisKey:value}); f.submit();
    const services = f.data().services;
    const evolution = env(services.find(s => s.data.serviceName === 'evolution'));
    for (const [key, host, pathname] of [['DATABASE_CONNECTION_URI','fixture_postgres','/evolution-app'], ['CACHE_REDIS_URI','fixture_redis','/5']]) {
      const uri = new URL(evolution[key]);
      assert.equal(decodeURIComponent(uri.password), value);
      assert.equal(uri.hostname, host); assert.equal(uri.pathname, pathname);
      assert.equal(uri.search, ''); assert.equal(uri.hash, '');
    }
    for (const service of services.filter(s => s.type === 'postgres' || s.type === 'redis')) {
      assert.equal(service.data.password, value);
    }
    for (const service of services.filter(s => s.data.serviceName.startsWith('n8n_'))) {
      const vars = env(service);
      assert.equal(vars.DB_POSTGRESDB_PASSWORD, value);
      assert.equal(vars.QUEUE_BULL_REDIS_PASSWORD, value);
    }
    assert.deepEqual(f.logs, []);
  });
}

test('ordinary inputs preserve the existing seven-service schema and optional email', () => {
  const f = fixture(); f.submit();
  assert.equal(f.data().services.length, 7);
  const vars = env(f.data().services[0]);
  assert.equal(vars.DATABASE_CONNECTION_URI, 'postgres://postgres:synthetic-postgres@fixture_postgres:5432/evolution-app');
  assert.equal(vars.CACHE_REDIS_URI, 'redis://default:synthetic-redis@fixture_redis:6379/5');
  assert.equal(f.fields.copyButton.style.display, 'block');
});

for (const field of required) {
  for (const value of ['', '   ', 'synthetic\nINJECT=value', 'synthetic\rvalue', 'synthetic\0value']) {
    test(`reject invalid ${field} before generating or copying`, () => {
      const f = fixture({[field]:value});
      f.fields.schemaOutput.textContent = 'stale output'; f.fields.copyButton.style.display = 'block';
      f.submit();
      assert.equal(f.fields.schemaOutput.textContent, '');
      assert.equal(f.fields.copyButton.style.display, 'none');
      assert.ok(f.fields[field].validity);
      assert.deepEqual(f.logs, []);
    });
  }
}

test('editing the form clears output and allows correction of a required field', () => {
  const f = fixture({projectName:''}); f.submit();
  f.fields.projectName.value = 'fixture';
  f.fields.schemaForm.listeners.input({target:f.fields.projectName});
  assert.equal(f.fields.projectName.validity, '');
  f.submit(); assert.equal(f.data().services.length, 7);
  f.fields.schemaForm.listeners.input({target:f.fields.postgresKey});
  assert.equal(f.fields.schemaOutput.textContent, '');
  assert.equal(f.fields.copyButton.style.display, 'none');
});

test('clipboard failure does not log an exception or generated schema', async () => {
  const f = fixture(); f.submit(); await f.fields.copyButton.listeners.click();
  assert.equal(f.clipboard.length, 1);
  assert.deepEqual(f.logs, []);
  assert.equal(f.alerts.length, 1);
  assert.doesNotMatch(f.alerts[0], /synthetic|postgres:\/\//);
});

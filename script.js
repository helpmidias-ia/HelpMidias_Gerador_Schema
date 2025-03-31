// Evento de envio do formulário
document.getElementById('schemaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Pegar os valores do formulário
    const projectName = document.getElementById('projectName').value;
    const defaultDomain = document.getElementById('defaultDomain').value;
    const apiEvolution = document.getElementById('apiEvolution').value;
    const n8nEncryptionKey = document.getElementById('n8nEncryptionKey').value;
    const redisKey = document.getElementById('redisKey').value;
    const postgresKey = document.getElementById('postgresKey').value;
    const email = document.getElementById('email').value;

    // Construir o objeto JSON sem o serviço "grafana"
    const jsonData = {
        "services": [
            {
                "type": "app",
                "data": {
                    "projectName": projectName,
                    "serviceName": "evolution",
                    "source": {
                        "type": "image",
                        "image": "atendai/evolution-api:latest"
                    },
                    "env": `SERVER_URL=https://${projectName}-evolution.${defaultDomain}\r\n` +
                        `DEL_INSTANCE=false\r\n` +
                        `DEL_TEMP_INSTANCES=false\r\n` +
                        `PROVIDER_ENABLED=false\r\n` +
                        `PROVIDER_HOST=127.0.0.1\r\n` +
                        `PROVIDER_PORT=5656\r\n` +
                        `PROVIDER_PREFIX=evolution-app\r\n` +
                        `DATABASE_ENABLED=true\r\n` +
                        `DATABASE_PROVIDER=postgresql\r\n` +
                        `DATABASE_CONNECTION_URI=postgres://postgres:${postgresKey}@${projectName}_postgres:5432/evolution-app\r\n` +
                        `DATABASE_CONNECTION_CLIENT_NAME=evolution-app\r\n` +
                        `CONFIG_SESSION_PHONE_VERSION=2.3000.1020992134\r\n` +
                        `SQS_ENABLED=false\r\n` +
                        `SQS_ACCESS_KEY_ID=\r\n` +
                        `SQS_SECRET_ACCESS_KEY=\r\n` +
                        `SQS_ACCOUNT_ID=\r\n` +
                        `SQS_REGION=\r\n` +
                        `WEBSOCKET_ENABLED=false\r\n` +
                        `WEBSOCKET_GLOBAL_EVENTS=false\r\n` +
                        `WA_BUSINESS_TOKEN_WEBHOOK=evolution\r\n` +
                        `WA_BUSINESS_URL=https://graph.facebook.com\r\n` +
                        `WA_BUSINESS_VERSION=v20.0\r\n` +
                        `WA_BUSINESS_LANGUAGE=pt_BR\r\n` +
                        `WEBHOOK_GLOBAL_URL=\r\n` +
                        `WEBHOOK_GLOBAL_ENABLED=false\r\n` +
                        `WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=false\r\n` +
                        `WEBHOOK_EVENTS_APPLICATION_STARTUP=true\r\n` +
                        `WEBHOOK_EVENTS_QRCODE_UPDATED=true\r\n` +
                        `WEBHOOK_EVENTS_MESSAGES_SET=false\r\n` +
                        `WEBHOOK_EVENTS_MESSAGES_UPSERT=false\r\n` +
                        `WEBHOOK_EVENTS_MESSAGES_EDITED=false\r\n` +
                        `WEBHOOK_EVENTS_MESSAGES_UPDATE=false\r\n` +
                        `WEBHOOK_EVENTS_MESSAGES_DELETE=false\r\n` +
                        `WEBHOOK_EVENTS_SEND_MESSAGE=false\r\n` +
                        `WEBHOOK_EVENTS_CONTACTS_SET=false\r\n` +
                        `WEBHOOK_EVENTS_CONTACTS_UPSERT=false\r\n` +
                        `WEBHOOK_EVENTS_CONTACTS_UPDATE=false\r\n` +
                        `WEBHOOK_EVENTS_PRESENCE_UPDATE=false\r\n` +
                        `WEBHOOK_EVENTS_CHATS_SET=false\r\n` +
                        `WEBHOOK_EVENTS_CHATS_UPSERT=false\r\n` +
                        `WEBHOOK_EVENTS_CHATS_UPDATE=false\r\n` +
                        `WEBHOOK_EVENTS_CHATS_DELETE=false\r\n` +
                        `WEBHOOK_EVENTS_GROUPS_UPSERT=false\r\n` +
                        `WEBHOOK_EVENTS_GROUPS_UPDATE=false\r\n` +
                        `WEBHOOK_EVENTS_GROUP_PARTICIPANTS_UPDATE=false\r\n` +
                        `WEBHOOK_EVENTS_CONNECTION_UPDATE=true\r\n` +
                        `WEBHOOK_EVENTS_LABELS_EDIT=false\r\n` +
                        `WEBHOOK_EVENTS_LABELS_ASSOCIATION=false\r\n` +
                        `WEBHOOK_EVENTS_CALL=false\r\n` +
                        `WEBHOOK_EVENTS_TYPEBOT_START=false\r\n` +
                        `WEBHOOK_EVENTS_TYPEBOT_CHANGE_STATUS=false\r\n` +
                        `WEBHOOK_EVENTS_ERRORS=false\r\n` +
                        `WEBHOOK_EVENTS_ERRORS_WEBHOOK=\r\n` +
                        `CONFIG_SESSION_PHONE_CLIENT=chrome\r\n` +
                        `CONFIG_SESSION_PHONE_NAME=Chrome\r\n` +
                        `QRCODE_LIMIT=2\r\n` +
                        `QRCODE_COLOR=#000000\r\n` +
                        `OPENAI_ENABLED=true\r\n` +
                        `DIFY_ENABLED=true\r\n` +
                        `TYPEBOT_ENABLED=false\r\n` +
                        `TYPEBOT_API_VERSION=latest\r\n` +
                        `CHATWOOT_ENABLED=false\r\n` +
                        `CHATWOOT_MESSAGE_READ=true\r\n` +
                        `CHATWOOT_IMPORT_DATABASE_CONNECTION_URI=postgresql://[USUARIO]:[SENHA]@[HOST]:5432/[CHATWOPOT_DATABASE]?sslmode=disable\r\n` +
                        `CHATWOOT_IMPORT_PLACEHOLDER_MEDIA_MESSAGE=true\r\n` +
                        `CACHE_REDIS_ENABLED=true\r\n` +
                        `CACHE_REDIS_URI=redis://default:${redisKey}@${projectName}_redis:6379/5\r\n` +
                        `CACHE_REDIS_PREFIX_KEY=evolution-app\r\n` +
                        `CACHE_REDIS_SAVE_INSTANCES=false\r\n` +
                        `CACHE_LOCAL_ENABLED=false\r\n` +
                        `S3_ENABLED=false\r\n` +
                        `S3_ACCESS_KEY=\r\n` +
                        `S3_SECRET_KEY=\r\n` +
                        `S3_BUCKET=evolution\r\n` +
                        `S3_PORT=443\r\n` +
                        `S3_ENDPOINT=\r\n` +
                        `S3_USE_SSL=true\r\n` +
                        `AUTHENTICATION_API_KEY=${apiEvolution}\r\n` +
                        `AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true\r\n` +
                        `LANGUAGE=pt-BR`,
                    "deploy": {
                        "replicas": 1,
                        "command": null,
                        "zeroDowntime": true
                    },
                    "domains": [
                        {
                            "host": `${projectName}-evolution.${defaultDomain}`,
                            "https": true,
                            "port": 8080,
                            "path": "/",
                            "wildcard": false,
                            "internalProtocol": "http"
                        }
                    ]
                }
            },
            {
                "type": "app",
                "data": {
                    "projectName": projectName,
                    "serviceName": "n8n_editor",
                    "source": {
                        "type": "image",
                        "image": "n8nio/n8n:latest"
                    },
                    "env": `DB_TYPE=postgresdb\r\n` +
                        `DB_POSTGRESDB_PORT=5432\r\n` +
                        `DB_POSTGRESDB_HOST=${projectName}_postgres\r\n` +
                        `DB_POSTGRESDB_DATABASE=n8n\r\n` +
                        `DB_POSTGRESDB_USER=postgres\r\n` +
                        `DB_POSTGRESDB_PASSWORD=${postgresKey}\r\n` +
                        `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}\r\n` +
                        `N8N_HOST=https://${projectName}-n8n-editor.${defaultDomain}\r\n` +
                        `N8N_EDITOR_BASE_URL=https://${projectName}-n8n-editor.${defaultDomain}\r\n` +
                        `N8N_PROTOCOL=https\r\n` +
                        `NODE_ENV=production\r\n` +
                        `WEBHOOK_URL=https://${projectName}-n8n-webhook.${defaultDomain}\r\n` +
                        `EXECUTIONS_MODE=queue\r\n` +
                        `QUEUE_BULL_REDIS_HOST=${projectName}_redis\r\n` +
                        `QUEUE_BULL_REDIS_PASSWORD=${redisKey}\r\n` +
                        `QUEUE_BULL_REDIS_PORT=6379\r\n` +
                        `QUEUE_BULL_REDIS_DB=2\r\n` +
                        `NODE_FUNCTION_ALLOW_EXTERNAL=*\r\n` +
                        `EXECUTIONS_DATA_PRUNE='true'\r\n` +
                        `EXECUTIONS_DATA_MAX_AGE=336\r\n` +
                        `GENERIC_TIMEZONE=America/Sao_Paulo\r\n` +
                        `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true\r\n` +
                        `N8N_RUNNERS_ENABLED=true\r\n` +
                        `N8N_RUNNERS_MODE=internal\r\n` +
                        `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true\r\n` +
                        `N8N_NODE_PATH=/home/node/.n8n/nodes\r\n` +
                        `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`,
                    "deploy": {
                        "replicas": 1,
                        "command": "n8n start",
                        "zeroDowntime": true
                    },
                    "domains": [
                        {
                            "host": `${projectName}-n8n-editor.${defaultDomain}`,
                            "https": true,
                            "port": 5678,
                            "path": "/",
                            "wildcard": false,
                            "internalProtocol": "http"
                        }
                    ]
                }
            },
            {
                "type": "app",
                "data": {
                    "projectName": projectName,
                    "serviceName": "n8n_webhook",
                    "source": {
                        "type": "image",
                        "image": "n8nio/n8n:latest"
                    },
                    "env": `DB_TYPE=postgresdb\r\n` +
                        `DB_POSTGRESDB_PORT=5432\r\n` +
                        `DB_POSTGRESDB_HOST=${projectName}_postgres\r\n` +
                        `DB_POSTGRESDB_DATABASE=n8n\r\n` +
                        `DB_POSTGRESDB_USER=postgres\r\n` +
                        `DB_POSTGRESDB_PASSWORD=${postgresKey}\r\n` +
                        `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}\r\n` +
                        `N8N_HOST=https://${projectName}-n8n-editor.${defaultDomain}\r\n` +
                        `N8N_EDITOR_BASE_URL=https://${projectName}-n8n-editor.${defaultDomain}\r\n` +
                        `N8N_PROTOCOL=https\r\n` +
                        `NODE_ENV=production\r\n` +
                        `WEBHOOK_URL=https://${projectName}-n8n-webhook.${defaultDomain}\r\n` +
                        `EXECUTIONS_MODE=queue\r\n` +
                        `QUEUE_BULL_REDIS_HOST=${projectName}_redis\r\n` +
                        `QUEUE_BULL_REDIS_PASSWORD=${redisKey}\r\n` +
                        `QUEUE_BULL_REDIS_PORT=6379\r\n` +
                        `QUEUE_BULL_REDIS_DB=2\r\n` +
                        `NODE_FUNCTION_ALLOW_EXTERNAL=*\r\n` +
                        `EXECUTIONS_DATA_PRUNE='true'\r\n` +
                        `EXECUTIONS_DATA_MAX_AGE=336\r\n` +
                        `GENERIC_TIMEZONE=America/Sao_Paulo\r\n` +
                        `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true\r\n` +
                        `N8N_RUNNERS_ENABLED=true\r\n` +
                        `N8N_RUNNERS_MODE=internal\r\n` +
                        `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true\r\n` +
                        `N8N_NODE_PATH=/home/node/.n8n/nodes\r\n` +
                        `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`,
                    "deploy": {
                        "replicas": 2,
                        "command": "n8n webhook",
                        "zeroDowntime": true
                    },
                    "domains": [
                        {
                            "host": `${projectName}-n8n-webhook.${defaultDomain}`,
                            "https": true,
                            "port": 5678,
                            "path": "/",
                            "wildcard": false,
                            "internalProtocol": "http"
                        }
                    ]
                }
            },
            {
                "type": "app",
                "data": {
                    "projectName": projectName,
                    "serviceName": "n8n_worker",
                    "source": {
                        "type": "image",
                        "image": "n8nio/n8n:latest"
                    },
                    "env": `DB_TYPE=postgresdb\r\n` +
                        `DB_POSTGRESDB_PORT=5432\r\n` +
                        `DB_POSTGRESDB_HOST=${projectName}_postgres\r\n` +
                        `DB_POSTGRESDB_DATABASE=n8n\r\n` +
                        `DB_POSTGRESDB_USER=postgres\r\n` +
                        `DB_POSTGRESDB_PASSWORD=${postgresKey}\r\n` +
                        `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}\r\n` +
                        `N8N_HOST=https://${projectName}-n8n-editor.${defaultDomain}\r\n` +
                        `N8N_EDITOR_BASE_URL=https://${projectName}-n8n-editor.${defaultDomain}\r\n` +
                        `N8N_PROTOCOL=https\r\n` +
                        `NODE_ENV=production\r\n` +
                        `WEBHOOK_URL=https://${projectName}-n8n-webhook.${defaultDomain}\r\n` +
                        `EXECUTIONS_MODE=queue\r\n` +
                        `QUEUE_BULL_REDIS_HOST=${projectName}_redis\r\n` +
                        `QUEUE_BULL_REDIS_PASSWORD=${redisKey}\r\n` +
                        `QUEUE_BULL_REDIS_PORT=6379\r\n` +
                        `QUEUE_BULL_REDIS_DB=2\r\n` +
                        `NODE_FUNCTION_ALLOW_EXTERNAL=*\r\n` +
                        `EXECUTIONS_DATA_PRUNE='true'\r\n` +
                        `EXECUTIONS_DATA_MAX_AGE=336\r\n` +
                        `GENERIC_TIMEZONE=America/Sao_Paulo\r\n` +
                        `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true\r\n` +
                        `N8N_RUNNERS_ENABLED=true\r\n` +
                        `N8N_RUNNERS_MODE=internal\r\n` +
                        `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true\r\n` +
                        `N8N_NODE_PATH=/home/node/.n8n/nodes\r\n` +
                        `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`,
                    "deploy": {
                        "replicas": 1,
                        "command": "n8n worker --concurrency=10",
                        "zeroDowntime": true
                    },
                    "domains": [
                        {
                            "host": `${projectName}-n8n-worker.${defaultDomain}`,
                            "https": true,
                            "port": 80,
                            "path": "/",
                            "wildcard": false,
                            "internalProtocol": "http"
                        }
                    ]
                }
            },
            {
                "type": "postgres",
                "data": {
                    "projectName": projectName,
                    "serviceName": "pgvector",
                    "image": "ankane/pgvector:v0.5.1",
                    "password": postgresKey
                }
            },
            {
                "type": "postgres",
                "data": {
                    "projectName": projectName,
                    "serviceName": "postgres",
                    "image": "pgvector/pgvector:pg17",
                    "password": postgresKey
                }
            },
            {
                "type": "redis",
                "data": {
                    "projectName": projectName,
                    "serviceName": "redis",
                    "image": "redis:7",
                    "password": redisKey
                }
            }
        ]
    };

    // Converter para string JSON com formatação
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Exibir o JSON no elemento <pre>
    const schemaOutput = document.getElementById('schemaOutput');
    schemaOutput.textContent = jsonString;

    // Mostrar o botão de copiar
    const copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'block';
});

// Função para copiar o schema para a área de transferência
document.getElementById('copyButton').addEventListener('click', async function() {
    const schemaOutput = document.getElementById('schemaOutput').textContent;
    try {
        await navigator.clipboard.writeText(schemaOutput);
        alert('Schema copiado para a área de transferência!');
    } catch (err) {
        console.error('Falha ao copiar: ', err);
        alert('Erro ao copiar o schema. Verifique o console para mais detalhes.');
    }
});
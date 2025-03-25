document.getElementById('schemaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar os valores dos campos
    const defaultDomain = document.getElementById('defaultDomain').value || 'helpmidias-evolution.ew3kso.easypanel.host';
    const apiEvolution = document.getElementById('apiEvolution').value || 'A3D1CF99FD393CFBD7AEE966BB78E';
    const n8nEncryptionKey = document.getElementById('n8nEncryptionKey').value || '6A8E9166AC3C1C7996667465C8549';
    const redisKey = document.getElementById('redisKey').value || '2647417615DF52CA273515CEB689F';
    const postgresKey = document.getElementById('postgresKey').value || '6C465235796521F9F95353677B473';
    const email = document.getElementById('email').value || 'seuemail@exemplo.com';

    // Construir o schema JSON
    const schema = {
        services: [
            {
                type: "app",
                data: {
                    projectName: "helpmidias",
                    serviceName: "evolution",
                    source: {
                        type: "image",
                        image: "atendai/evolution-api:latest"
                    },
                    env: [
                        `SERVER_URL=https://${defaultDomain}`,
                        "DEL_INSTANCE=false",
                        "DEL_TEMP_INSTANCES=false",
                        "PROVIDER_ENABLED=false",
                        "PROVIDER_HOST=127.0.0.1",
                        "PROVIDER_PORT=5656",
                        "PROVIDER_PREFIX=evolution-app",
                        "DATABASE_ENABLED=true",
                        "DATABASE_PROVIDER=postgresql",
                        `DATABASE_CONNECTION_URI=postgres://postgres:${postgresKey}@helpmidias_postgres:5432/evolution-app`,
                        "DATABASE_CONNECTION_CLIENT_NAME=evolution-app",
                        "CONFIG_SESSION_PHONE_VERSION=2.3000.1020992134",
                        "SQS_ENABLED=false",
                        "SQS_ACCESS_KEY_ID=",
                        "SQS_SECRET_ACCESS_KEY=",
                        "SQS_ACCOUNT_ID=",
                        "SQS_REGION=",
                        "WEBSOCKET_ENABLED=false",
                        "WEBSOCKET_GLOBAL_EVENTS=false",
                        "WA_BUSINESS_TOKEN_WEBHOOK=evolution",
                        "WA_BUSINESS_URL=https://graph.facebook.com",
                        "WA_BUSINESS_VERSION=v20.0",
                        "WA_BUSINESS_LANGUAGE=pt_BR",
                        "WEBHOOK_GLOBAL_URL=",
                        "WEBHOOK_GLOBAL_ENABLED=false",
                        "WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=false",
                        "WEBHOOK_EVENTS_APPLICATION_STARTUP=true",
                        "WEBHOOK_EVENTS_QRCODE_UPDATED=true",
                        "WEBHOOK_EVENTS_MESSAGES_SET=false",
                        "WEBHOOK_EVENTS_MESSAGES_UPSERT=false",
                        "WEBHOOK_EVENTS_MESSAGES_EDITED=false",
                        "WEBHOOK_EVENTS_MESSAGES_UPDATE=false",
                        "WEBHOOK_EVENTS_MESSAGES_DELETE=false",
                        "WEBHOOK_EVENTS_SEND_MESSAGE=false",
                        "WEBHOOK_EVENTS_CONTACTS_SET=false",
                        "WEBHOOK_EVENTS_CONTACTS_UPSERT=false",
                        "WEBHOOK_EVENTS_CONTACTS_UPDATE=false",
                        "WEBHOOK_EVENTS_PRESENCE_UPDATE=false",
                        "WEBHOOK_EVENTS_CHATS_SET=false",
                        "WEBHOOK_EVENTS_CHATS_UPSERT=false",
                        "WEBHOOK_EVENTS_CHATS_UPDATE=false",
                        "WEBHOOK_EVENTS_CHATS_DELETE=false",
                        "WEBHOOK_EVENTS_GROUPS_UPSERT=false",
                        "WEBHOOK_EVENTS_GROUPS_UPDATE=false",
                        "WEBHOOK_EVENTS_GROUP_PARTICIPANTS_UPDATE=false",
                        "WEBHOOK_EVENTS_CONNECTION_UPDATE=true",
                        "WEBHOOK_EVENTS_LABELS_EDIT=false",
                        "WEBHOOK_EVENTS_LABELS_ASSOCIATION=false",
                        "WEBHOOK_EVENTS_CALL=false",
                        "WEBHOOK_EVENTS_TYPEBOT_START=false",
                        "WEBHOOK_EVENTS_TYPEBOT_CHANGE_STATUS=false",
                        "WEBHOOK_EVENTS_ERRORS=false",
                        "WEBHOOK_EVENTS_ERRORS_WEBHOOK=",
                        "CONFIG_SESSION_PHONE_CLIENT=chrome",
                        "CONFIG_SESSION_PHONE_NAME=Chrome",
                        "QRCODE_LIMIT=2",
                        "QRCODE_COLOR=#000000",
                        "OPENAI_ENABLED=true",
                        "DIFY_ENABLED=true",
                        "TYPEBOT_ENABLED=false",
                        "TYPEBOT_API_VERSION=latest",
                        "CHATWOOT_ENABLED=false",
                        "CHATWOOT_MESSAGE_READ=true",
                        "CHATWOOT_IMPORT_DATABASE_CONNECTION_URI=postgresql://[USUARIO]:[SENHA]@[HOST]:5432/[CHATWOPOT_DATABASE]?sslmode=disable",
                        "CHATWOOT_IMPORT_PLACEHOLDER_MEDIA_MESSAGE=true",
                        "CACHE_REDIS_ENABLED=true",
                        `CACHE_REDIS_URI=redis://default:${redisKey}@helpmidias_redis:6379/5`,
                        "CACHE_REDIS_PREFIX_KEY=evolution-app",
                        "CACHE_REDIS_SAVE_INSTANCES=false",
                        "CACHE_LOCAL_ENABLED=false",
                        "S3_ENABLED=false",
                        "S3_ACCESS_KEY=",
                        "S3_SECRET_KEY=",
                        "S3_BUCKET=evolution",
                        "S3_PORT=443",
                        "S3_ENDPOINT=",
                        "S3_USE_SSL=true",
                        `AUTHENTICATION_API_KEY=${apiEvolution}`,
                        "AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true",
                        "LANGUAGE=pt-BR"
                    ].join("\r\n"),
                    deploy: {
                        replicas: 1,
                        command: null,
                        zeroDowntime: true
                    },
                    domains: [
                        {
                            host: defaultDomain,
                            https: true,
                            port: 8080,
                            path: "/",
                            wildcard: false,
                            internalProtocol: "http"
                        }
                    ]
                }
            },
            {
                type: "app",
                data: {
                    projectName: "helpmidias",
                    serviceName: "n8n_editor",
                    source: {
                        type: "image",
                        image: "n8nio/n8n:latest"
                    },
                    env: [
                        "DB_TYPE=postgresdb",
                        "DB_POSTGRESDB_PORT=5432",
                        "DB_POSTGRESDB_HOST=helpmidias_postgres",
                        "DB_POSTGRESDB_DATABASE=n8n",
                        "DB_POSTGRESDB_USER=postgres",
                        `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                        `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                        "N8N_HOST=https://helpmidias-n8n-editor.ew3kso.easypanel.host",
                        "N8N_EDITOR_BASE_URL=https://helpmidias-n8n-editor.ew3kso.easypanel.host",
                        "N8N_PROTOCOL=https",
                        "NODE_ENV=production",
                        "WEBHOOK_URL=https://helpmidias-n8n-webhook.ew3kso.easypanel.host",
                        "EXECUTIONS_MODE=queue",
                        "QUEUE_BULL_REDIS_HOST=helpmidias_redis",
                        `QUEUE_BULL_REDIS_PASSWORD=${redisKey}`,
                        "QUEUE_BULL_REDIS_PORT=6379",
                        "QUEUE_BULL_REDIS_DB=2",
                        "NODE_FUNCTION_ALLOW_EXTERNAL=*",
                        "EXECUTIONS_DATA_PRUNE='true'",
                        "EXECUTIONS_DATA_MAX_AGE=336",
                        "GENERIC_TIMEZONE=America/Sao_Paulo",
                        "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true",
                        "N8N_RUNNERS_ENABLED=true",
                        "N8N_RUNNERS_MODE=internal",
                        "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true",
                        "N8N_NODE_PATH=/home/node/.n8n/nodes"
                    ].join("\r\n"),
                    deploy: {
                        replicas: 1,
                        command: "n8n start",
                        zeroDowntime: true
                    },
                    domains: [
                        {
                            host: "helpmidias-n8n-editor.ew3kso.easypanel.host",
                            https: true,
                            port: 5678,
                            path: "/",
                            wildcard: false,
                            internalProtocol: "http"
                        }
                    ]
                }
            },
            {
                type: "app",
                data: {
                    projectName: "helpmidias",
                    serviceName: "n8n_webhook",
                    source: {
                        type: "image",
                        image: "n8nio/n8n:latest"
                    },
                    env: [
                        "DB_TYPE=postgresdb",
                        "DB_POSTGRESDB_PORT=5432",
                        "DB_POSTGRESDB_HOST=helpmidias_postgres",
                        "DB_POSTGRESDB_DATABASE=n8n",
                        "DB_POSTGRESDB_USER=postgres",
                        `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                        `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                        "N8N_HOST=https://helpmidias-n8n-editor.ew3kso.easypanel.host",
                        "N8N_EDITOR_BASE_URL=https://helpmidias-n8n-editor.ew3kso.easypanel.host",
                        "N8N_PROTOCOL=https",
                        "NODE_ENV=production",
                        "WEBHOOK_URL=https://helpmidias-n8n-webhook.ew3kso.easypanel.host",
                        "EXECUTIONS_MODE=queue",
                        "QUEUE_BULL_REDIS_HOST=helpmidias_redis",
                        `QUEUE_BULL_REDIS_PASSWORD=${redisKey}`,
                        "QUEUE_BULL_REDIS_PORT=6379",
                        "QUEUE_BULL_REDIS_DB=2",
                        "NODE_FUNCTION_ALLOW_EXTERNAL=*",
                        "EXECUTIONS_DATA_PRUNE='true'",
                        "EXECUTIONS_DATA_MAX_AGE=336",
                        "GENERIC_TIMEZONE=America/Sao_Paulo",
                        "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true",
                        "N8N_RUNNERS_ENABLED=true",
                        "N8N_RUNNERS_MODE=internal",
                        "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true",
                        "N8N_NODE_PATH=/home/node/.n8n/nodes"
                    ].join("\r\n"),
                    deploy: {
                        replicas: 2,
                        command: "n8n webhook",
                        zeroDowntime: true
                    },
                    domains: [
                        {
                            host: "helpmidias-n8n-webhook.ew3kso.easypanel.host",
                            https: true,
                            port: 5678,
                            path: "/",
                            wildcard: false,
                            internalProtocol: "http"
                        }
                    ]
                }
            },
            {
                type: "app",
                data: {
                    projectName: "helpmidias",
                    serviceName: "n8n_worker",
                    source: {
                        type: "image",
                        image: "n8nio/n8n:latest"
                    },
                    env: [
                        "DB_TYPE=postgresdb",
                        "DB_POSTGRESDB_PORT=5432",
                        "DB_POSTGRESDB_HOST=helpmidias_postgres",
                        "DB_POSTGRESDB_DATABASE=n8n",
                        "DB_POSTGRESDB_USER=postgres",
                        `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                        `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                        "N8N_HOST=https://helpmidias-n8n-editor.ew3kso.easypanel.host",
                        "N8N_EDITOR_BASE_URL=https://helpmidias-n8n-editor.ew3kso.easypanel.host",
                        "N8N_PROTOCOL=https",
                        "NODE_ENV=production",
                        "WEBHOOK_URL=https://helpmidias-n8n-webhook.ew3kso.easypanel.host",
                        "EXECUTIONS_MODE=queue",
                        "QUEUE_BULL_REDIS_HOST=helpmidias_redis",
                        `QUEUE_BULL_REDIS_PASSWORD=${redisKey}`,
                        "QUEUE_BULL_REDIS_PORT=6379",
                        "QUEUE_BULL_REDIS_DB=2",
                        "NODE_FUNCTION_ALLOW_EXTERNAL=*",
                        "EXECUTIONS_DATA_PRUNE='true'",
                        "EXECUTIONS_DATA_MAX_AGE=336",
                        "GENERIC_TIMEZONE=America/Sao_Paulo",
                        "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true",
                        "N8N_RUNNERS_ENABLED=true",
                        "N8N_RUNNERS_MODE=internal",
                        "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true",
                        "N8N_NODE_PATH=/home/node/.n8n/nodes"
                    ].join("\r\n"),
                    deploy: {
                        replicas: 1,
                        command: "n8n worker --concurrency=10",
                        zeroDowntime: true
                    },
                    domains: [
                        {
                            host: "helpmidias-n8n-worker.ew3kso.easypanel.host",
                            https: true,
                            port: 80,
                            path: "/",
                            wildcard: false,
                            internalProtocol: "http"
                        }
                    ]
                }
            },
            {
                type: "postgres",
                data: {
                    projectName: "helpmidias",
                    serviceName: "postgres",
                    image: "pgvector/pgvector:pg17",
                    password: postgresKey
                }
            },
            {
                type: "redis",
                data: {
                    projectName: "helpmidias",
                    serviceName: "redis",
                    image: "redis:7",
                    password: redisKey
                }
            }
        ]
    };

    // Converter o schema para string JSON formatada
    const schemaString = JSON.stringify(schema, null, 2);

    // Exibir o schema gerado na página
    const schemaOutput = document.getElementById('schemaOutput');
    schemaOutput.textContent = schemaString;

    // Mostrar o botão de copiar
    const copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'block';

    // Adicionar funcionalidade ao botão de copiar
    copyButton.onclick = function() {
        navigator.clipboard.writeText(schemaString).then(() => {
            alert('Schema copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar o schema:', err);
            alert('Erro ao copiar o schema. Por favor, copie manualmente.');
        });
    };
});
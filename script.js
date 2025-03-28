// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('schemaForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Capturar os valores dos campos (corrigido para usar os IDs do index.html)
        const projectName = document.getElementById('projectName').value || 'helpmidias';
        const defaultDomain = document.getElementById('defaultDomain').value || '2ecw2a.easypanel.host';
        const apiEvolution = document.getElementById('apiEvolution').value || 'A3D1CF99FD393CFBD7AEE966BB78E'; // Corrigido de apiKey para apiEvolution
        const n8nEncryptionKey = document.getElementById('n8nEncryptionKey').value || '6A8E9166AC3C1C7996667465C8549';
        const redisKey = document.getElementById('redisKey').value || '2647417615DF52CA273515CEB689F';
        const postgresKey = document.getElementById('postgresKey').value || '6C465235796521F9F95353677B473';
        const email = document.getElementById('email').value || 'seuemail@exemplo.com'; // Adicionado, mas não usado no schema

        // Construir os domínios completos usando o projectName e o subdomínio
        const evolutionDomain = `${projectName}-evolution.${defaultDomain}`;
        const grafanaDomain = `${projectName}-grafana.${defaultDomain}`;
        const n8nEditorDomain = `${projectName}-n8n-editor.${defaultDomain}`;
        const n8nWebhookDomain = `${projectName}-n8n-webhook.${defaultDomain}`;
        const n8nWorkerDomain = `${projectName}-n8n-worker.${defaultDomain}`;
        const mcpDomain = `${projectName}-mcp.${defaultDomain}`;

        // Construir o schema JSON
        const schema = {
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
                        "env": [
                            "SERVER_URL=https://$(PRIMARY_DOMAIN)",
                            "DEL_INSTANCE=false",
                            "DEL_TEMP_INSTANCES=false",
                            "PROVIDER_ENABLED=false",
                            "PROVIDER_HOST=127.0.0.1",
                            "PROVIDER_PORT=5656",
                            "PROVIDER_PREFIX=evolution-app",
                            "DATABASE_ENABLED=true",
                            "DATABASE_PROVIDER=postgresql",
                            `DATABASE_CONNECTION_URI=postgres://postgres:${postgresKey}@${projectName}_postgres:5432/evolution-app`,
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
                            `CHATWOOT_IMPORT_DATABASE_CONNECTION_URI=postgresql://postgres:${postgresKey}@${projectName}_postgres:5432/chatwoot?sslmode=disable`,
                            "CHATWOOT_IMPORT_PLACEHOLDER_MEDIA_MESSAGE=true",
                            "CACHE_REDIS_ENABLED=true",
                            `CACHE_REDIS_URI=redis://default:${redisKey}@${projectName}_redis:6379/5`,
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
                            `AUTHENTICATION_API_KEY=${apiEvolution}`, // Corrigido para usar apiEvolution
                            "AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true",
                            "LANGUAGE=pt-BR"
                        ].join("\r\n"),
                        "deploy": {
                            "replicas": 1,
                            "command": null,
                            "zeroDowntime": true
                        },
                        "domains": [
                            {
                                "host": evolutionDomain,
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
                        "serviceName": "grafana",
                        "source": {
                            "type": "image",
                            "image": "grafana/grafana-oss:11.4.0"
                        },
                        "env": "GF_CHECK_FOR_UPDATES=false",
                        "deploy": {
                            "replicas": 1,
                            "command": null,
                            "zeroDowntime": true
                        },
                        "domains": [
                            {
                                "host": grafanaDomain,
                                "https": true,
                                "port": 3000,
                                "path": "/",
                                "wildcard": false,
                                "internalProtocol": "http"
                            }
                        ],
                        "mounts": [
                            {
                                "type": "volume",
                                "name": "storage",
                                "mountPath": "/var/lib/grafana"
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
                            "image": "n8nio/n8n:1.84.3"
                        },
                        "env": [
                            "DB_TYPE=postgresdb",
                            "DB_POSTGRESDB_PORT=5432",
                            `DB_POSTGRESDB_HOST=${projectName}_postgres`,
                            "DB_POSTGRESDB_DATABASE=n8n",
                            "DB_POSTGRESDB_USER=postgres",
                            `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                            `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                            `N8N_MCP_SERVER_URL=https://${mcpDomain}`,
                            `N8N_HOST=https://${n8nEditorDomain}`,
                            `N8N_EDITOR_BASE_URL=https://${n8nEditorDomain}`,
                            "N8N_PROTOCOL=https",
                            "NODE_ENV=production",
                            `WEBHOOK_URL=https://${n8nWebhookDomain}`,
                            "EXECUTIONS_MODE=queue",
                            `QUEUE_BULL_REDIS_HOST=${projectName}_redis`,
                            `QUEUE_BULL_REDIS_PASSWORD=${redisKey}`,
                            "QUEUE_BULL_REDIS_PORT=6379",
                            "QUEUE_BULL_REDIS_DB=2",
                            "NODE_FUNCTION_ALLOW_EXTERNAL=*",
                            "EXECUTIONS_DATA_PRUNE=true",
                            "EXECUTIONS_DATA_MAX_AGE=336",
                            "GENERIC_TIMEZONE=America/Sao_Paulo",
                            "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true",
                            "N8N_RUNNERS_ENABLED=true",
                            "N8N_RUNNERS_MODE=internal",
                            "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true",
                            "N8N_NODE_PATH=/home/node/.n8n/nodes",
                            "N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true"
                        ].join("\r\n"),
                        "deploy": {
                            "replicas": 1,
                            "command": "sh -c 'npm install n8n-nodes-evolution-api n8n-nodes-global @couleetech/n8n-nodes-mcp-client && n8n start'",
                            "zeroDowntime": true
                        },
                        "domains": [
                            {
                                "host": n8nEditorDomain,
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
                            "image": "n8nio/n8n:1.84.3"
                        },
                        "env": [
                            "DB_TYPE=postgresdb",
                            "DB_POSTGRESDB_PORT=5432",
                            `DB_POSTGRESDB_HOST=${projectName}_postgres`,
                            "DB_POSTGRESDB_DATABASE=n8n",
                            "DB_POSTGRESDB_USER=postgres",
                            `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                            `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                            `N8N_MCP_SERVER_URL=https://${mcpDomain}`,
                            `N8N_HOST=https://${n8nEditorDomain}`,
                            `N8N_EDITOR_BASE_URL=https://${n8nEditorDomain}`,
                            "N8N_PROTOCOL=https",
                            "NODE_ENV=production",
                            `WEBHOOK_URL=https://${n8nWebhookDomain}`,
                            "EXECUTIONS_MODE=queue",
                            `QUEUE_BULL_REDIS_HOST=${projectName}_redis`,
                            `QUEUE_BULL_REDIS_PASSWORD=${redisKey}`,
                            "QUEUE_BULL_REDIS_PORT=6379",
                            "QUEUE_BULL_REDIS_DB=2",
                            "NODE_FUNCTION_ALLOW_EXTERNAL=*",
                            "EXECUTIONS_DATA_PRUNE=true",
                            "EXECUTIONS_DATA_MAX_AGE=336",
                            "GENERIC_TIMEZONE=America/Sao_Paulo",
                            "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true",
                            "N8N_RUNNERS_ENABLED=true",
                            "N8N_RUNNERS_MODE=internal",
                            "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true",
                            "N8N_NODE_PATH=/home/node/.n8n/nodes",
                            "N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true"
                        ].join("\r\n"),
                        "deploy": {
                            "replicas": 2,
                            "command": "sh -c 'npm install n8n-nodes-evolution-api n8n-nodes-global @couleetech/n8n-nodes-mcp-client && n8n webhook'",
                            "zeroDowntime": true
                        },
                        "domains": [
                            {
                                "host": n8nWebhookDomain,
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
                            "image": "n8nio/n8n:1.84.3"
                        },
                        "env": [
                            "DB_TYPE=postgresdb",
                            "DB_POSTGRESDB_PORT=5432",
                            `DB_POSTGRESDB_HOST=${projectName}_postgres`,
                            "DB_POSTGRESDB_DATABASE=n8n",
                            "DB_POSTGRESDB_USER=postgres",
                            `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                            `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                            `N8N_MCP_SERVER_URL=https://${mcpDomain}`,
                            `N8N_HOST=https://${n8nEditorDomain}`,
                            `N8N_EDITOR_BASE_URL=https://${n8nEditorDomain}`,
                            "N8N_PROTOCOL=https",
                            "NODE_ENV=production",
                            `WEBHOOK_URL=https://${n8nWebhookDomain}`,
                            "EXECUTIONS_MODE=queue",
                            `QUEUE_BULL_REDIS_HOST=${projectName}_redis`,
                            `QUEUE_BULL_REDIS_PASSWORD=${redisKey}`,
                            "QUEUE_BULL_REDIS_PORT=6379",
                            "QUEUE_BULL_REDIS_DB=2",
                            "NODE_FUNCTION_ALLOW_EXTERNAL=*",
                            "EXECUTIONS_DATA_PRUNE=true",
                            "EXECUTIONS_DATA_MAX_AGE=336",
                            "GENERIC_TIMEZONE=America/Sao_Paulo",
                            "N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true",
                            "N8N_RUNNERS_ENABLED=true",
                            "N8N_RUNNERS_MODE=internal",
                            "OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true",
                            "N8N_NODE_PATH=/home/node/.n8n/nodes",
                            "N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true"
                        ].join("\r\n"),
                        "deploy": {
                            "replicas": 1,
                            "command": "sh -c 'npm install n8n-nodes-evolution-api n8n-nodes-global @couleetech/n8n-nodes-mcp-client && n8n worker --concurrency=10'",
                            "zeroDowntime": true
                        },
                        "domains": [
                            {
                                "host": n8nWorkerDomain,
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
                        "password": "afa9090d0253279a55ae"
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
                },
                {
                    "type": "app",
                    "data": {
                        "projectName": projectName,
                        "serviceName": "mcp_server",
                        "source": {
                            "type": "image",
                            "image": "node:18"
                        },
                        "env": [
                            "PORT=3001",
                            "MCP_HOST=0.0.0.0",
                            `CACHE_REDIS_URI=redis://default:${redisKey}@${projectName}_redis:6379/2`,
                            `DB_TYPE=postgresdb`,
                            `DB_POSTGRESDB_HOST=${projectName}_postgres`,
                            `DB_POSTGRESDB_DATABASE=n8n`,
                            `DB_POSTGRESDB_USER=postgres`,
                            `DB_POSTGRESDB_PASSWORD=${postgresKey}`,
                            `N8N_ENCRYPTION_KEY=${n8nEncryptionKey}`,
                            `N8N_API_URL=https://${n8nEditorDomain}`
                        ].join("\r\n"),
                        "deploy": {
                            "replicas": 1,
                            "command": "npm install n8n-mcp-server -g && n8n-mcp-server",
                            "zeroDowntime": true
                        },
                        "domains": [
                            {
                                "host": mcpDomain,
                                "https": true,
                                "port": 3001,
                                "path": "/",
                                "wildcard": false,
                                "internalProtocol": "http"
                            }
                        ]
                    }
                }
            ]
        };

        // Converter o schema para string JSON formatada
        const schemaString = JSON.stringify(schema, null, 2);

        // Exibir o schema gerado na página
        const schemaOutput = document.getElementById('schemaOutput');
        if (schemaOutput) {
            schemaOutput.textContent = schemaString;
        } else {
            console.error('Elemento schemaOutput não encontrado no DOM');
        }

        // Mostrar o botão de copiar
        const copyButton = document.getElementById('copyButton');
        if (copyButton) {
            copyButton.style.display = 'block';
        } else {
            console.error('Elemento copyButton não encontrado no DOM');
        }

        // Adicionar funcionalidade ao botão de copiar
        if (copyButton) {
            copyButton.onclick = function() {
                navigator.clipboard.writeText(schemaString).then(() => {
                    alert('Schema copiado para a área de transferência!');
                }).catch(err => {
                    console.error('Erro ao copiar o schema:', err);
                    alert('Erro ao copiar o schema. Por favor, copie manualmente.');
                });
            };
        }
    });
});
export function environment(): string {
  return 'environment';
}

export const BACKEND_ENV = {
  RABBITMQ_URL: 'amqp://localhost:5672',
  QUEUE: {
    GATEWAY: {
      NAME: 'gateway_queue',
      EVENT: {
        OK: 'ok',
        BAD: 'bad',
      },
    },
    AUTH: {
      NAME: 'auth_queue',
      EVENT: {
        CHECK: 'check',
      },
    },
    FS: {
      NAME: 'file_system_queue',
      EVENT: {},
    },
    LOG: {
      NAME: 'log_queue',
      EVENT: {},
    },
    DISPATCHER: {
      NAME: 'dispatcher_queue',
      EVENT: {
        PROCESS: 'process',
      },
    },
  },
};

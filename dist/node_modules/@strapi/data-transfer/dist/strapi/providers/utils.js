"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimTrailingSlash = exports.connectToWebsocket = exports.createDispatcher = void 0;
const crypto_1 = require("crypto");
const ws_1 = require("ws");
const providers_1 = require("../../errors/providers");
const createDispatcher = (ws) => {
    const state = {};
    const dispatch = async (message, options = {}) => {
        if (!ws) {
            throw new Error('No websocket connection found');
        }
        return new Promise((resolve, reject) => {
            const uuid = (0, crypto_1.randomUUID)();
            const payload = { ...message, uuid };
            if (options.attachTransfer) {
                Object.assign(payload, { transferID: state.transfer?.id });
            }
            const stringifiedPayload = JSON.stringify(payload);
            ws.send(stringifiedPayload, (error) => {
                if (error) {
                    reject(error);
                }
            });
            const onResponse = (raw) => {
                const response = JSON.parse(raw.toString());
                if (response.uuid === uuid) {
                    if (response.error) {
                        return reject(new providers_1.ProviderError('error', response.error.message));
                    }
                    resolve(response.data ?? null);
                }
                else {
                    ws.once('message', onResponse);
                }
            };
            ws.once('message', onResponse);
        });
    };
    const dispatchCommand = (payload) => {
        return dispatch({ type: 'command', ...payload });
    };
    const dispatchTransferAction = async (action) => {
        const payload = { type: 'transfer', kind: 'action', action };
        return dispatch(payload, { attachTransfer: true }) ?? Promise.resolve(null);
    };
    const dispatchTransferStep = async (payload) => {
        const message = {
            type: 'transfer',
            kind: 'step',
            ...payload,
        };
        return dispatch(message, { attachTransfer: true }) ?? Promise.resolve(null);
    };
    const setTransferProperties = (properties) => {
        state.transfer = { ...properties };
    };
    return {
        get transferID() {
            return state.transfer?.id;
        },
        get transferKind() {
            return state.transfer?.kind;
        },
        setTransferProperties,
        dispatch,
        dispatchCommand,
        dispatchTransferAction,
        dispatchTransferStep,
    };
};
exports.createDispatcher = createDispatcher;
const connectToWebsocket = (address, options) => {
    return new Promise((resolve, reject) => {
        const server = new ws_1.WebSocket(address, options);
        server.once('open', () => {
            resolve(server);
        });
        server.on('unexpected-response', (_req, res) => {
            if (res.statusCode === 401) {
                return reject(new providers_1.ProviderInitializationError('Failed to initialize the connection: Authentication Error'));
            }
            if (res.statusCode === 403) {
                return reject(new providers_1.ProviderInitializationError('Failed to initialize the connection: Authorization Error'));
            }
            if (res.statusCode === 404) {
                return reject(new providers_1.ProviderInitializationError('Failed to initialize the connection: Data transfer is not enabled on the remote host'));
            }
            return reject(new providers_1.ProviderInitializationError(`Failed to initialize the connection: Unexpected server response ${res.statusCode}`));
        });
        server.once('error', (err) => {
            reject(new providers_1.ProviderTransferError(err.message, {
                details: {
                    error: err.message,
                },
            }));
        });
    });
};
exports.connectToWebsocket = connectToWebsocket;
const trimTrailingSlash = (input) => {
    return input.replace(/\/$/, '');
};
exports.trimTrailingSlash = trimTrailingSlash;
//# sourceMappingURL=utils.js.map
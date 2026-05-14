import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:8080/ws-ticketing';

class WebSocketService {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.listeners = {
            logs: [],
            status: [],
            events: [],
            connection: [],
        };
    }

    connect(onConnectSuccess, onConnectError) {
        this.client = new Client({
            webSocketFactory: () => new SockJS(WS_URL),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('✅ STOMP Connected');
                this.isConnected = true;
                this.notifyListeners('connection', { status: 'connected' });
                if (onConnectSuccess) onConnectSuccess();

                // Subscribe to topics
                this.client.subscribe('/topic/logs', (message) => {
                    const data = JSON.parse(message.body);
                    this.notifyListeners('logs', data);
                });

                this.client.subscribe('/topic/status', (message) => {
                    const data = JSON.parse(message.body);
                    this.notifyListeners('status', data);
                });

                this.client.subscribe('/topic/events', (message) => {
                    const data = JSON.parse(message.body);
                    this.notifyListeners('events', data);
                });

                // Request initial data
                setTimeout(() => {
                    this.requestLogs();
                    this.requestStatus();
                }, 300);
            },
            onDisconnect: () => {
                console.log('❌ STOMP Disconnected');
                this.isConnected = false;
                this.notifyListeners('connection', { status: 'disconnected' });
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
                if (onConnectError) onConnectError(frame);
            },
        });

        this.client.activate();
    }

    send(message) {
        if (this.client && this.client.connected) {
            this.client.publish({
                destination: '/app/message',
                body: JSON.stringify(message),
            });
        }
    }

    requestLogs() {
        this.send({ type: 'REQUEST_LOGS' });
    }

    requestStatus() {
        this.send({ type: 'REQUEST_STATUS' });
    }

    addListener(eventType, callback) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].push(callback);
        }
        return () => this.removeListener(eventType, callback);
    }

    removeListener(eventType, callback) {
        if (this.listeners[eventType]) {
            this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
        }
    }

    notifyListeners(eventType, data) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach(cb => {
                try { cb(data); } catch (e) { console.error(e); }
            });
        }
    }

    getConnectionStatus() {
        return this.isConnected;
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            this.isConnected = false;
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
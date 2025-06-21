
export type VoiceAgentStatus = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export interface VoiceLogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

export interface VoiceAgent {
  id: string;
  status: VoiceAgentStatus;
  logs: VoiceLogEntry[];
  mediaRecorder: MediaRecorder | null;
  audioChunks: Blob[];
  addLog: (level: VoiceLogEntry['level'], message: string) => void;
  initVoiceAgent: () => Promise<Blob>;
  startListening: () => Promise<void>;
  stopListening: () => void;
}

export const initVoiceAgent = async (): Promise<Blob> => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('getUserMedia not supported');
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const audioChunks: Blob[] = [];

  return new Promise<Blob>((resolve) => {
    mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      resolve(audioBlob);
    };

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 4000); // Auto stop after 4s
  });
};

const VoiceAgent: VoiceAgent = {
  id: 'voice-agent-001',
  status: 'idle',
  logs: [],
  mediaRecorder: null,
  audioChunks: [],
  
  addLog: function(level: VoiceLogEntry['level'], message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push({ timestamp, level, message });
    console.log(`[${timestamp}] VOICE ${level.toUpperCase()}: ${message}`);
  },
  
  initVoiceAgent: async function(): Promise<Blob> {
    this.status = 'processing';
    this.addLog('info', 'Initializing voice agent...');
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }

      this.addLog('info', 'Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      
      this.addLog('info', 'Voice agent initialized successfully');
      this.status = 'idle';
      
      return new Promise<Blob>((resolve) => {
        if (!this.mediaRecorder) return;
        
        this.mediaRecorder.ondataavailable = (event) => this.audioChunks.push(event.data);
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.addLog('info', `Audio recorded: ${audioBlob.size} bytes`);
          resolve(audioBlob);
        };

        this.addLog('info', 'Starting 4-second recording...');
        this.status = 'listening';
        this.mediaRecorder.start();
        setTimeout(() => {
          if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
            this.status = 'processing';
          }
        }, 4000);
      });
      
    } catch (error) {
      this.status = 'error';
      this.addLog('error', `Voice agent initialization failed: ${error}`);
      throw error;
    }
  },
  
  startListening: async function() {
    this.status = 'listening';
    this.addLog('info', 'Voice agent started listening');
    
    try {
      const audioBlob = await this.initVoiceAgent();
      this.addLog('info', 'Recording completed');
      this.status = 'idle';
      return audioBlob;
    } catch (error) {
      this.status = 'error';
      this.addLog('error', `Recording failed: ${error}`);
      throw error;
    }
  },
  
  stopListening: function() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.status = 'idle';
      this.addLog('info', 'Recording stopped manually');
    }
  }
};

export default VoiceAgent;

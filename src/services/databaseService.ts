import mysql from 'mysql2/promise';

const dbConfig = {
  host: import.meta.env.VITE_DB_HOST,
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_NAME
};

export interface User {
  id?: number;
  customer_name: string;
  whatsapp_number: string;
  license_key: string;
  act_date: string;
  end_date: string;
  deleted_key: 'yes' | 'no';
  life_time: string;
  plan_type: string;
  email?: string;
  skd_id?: string;
  fk_sk_id?: string;
  device_id?: string;
  config?: string;
  archive: 'true' | 'false';
  created_at?: string;
  modified_at?: string;
  device_name?: string;
  removed_at?: string;
  removal_manual: 'true' | 'false';
  removed_manual_at?: string;
  build_version?: string;
  pc_id?: string;
  status: 'true' | 'false';
  plan: 'true' | 'false';
  user_id: string;
  pro: 'true' | 'false';
  subscription: 'true' | 'false';
  chatgpt_key?: string;
  userdata?: string;
}

class DatabaseService {
  private static instance: DatabaseService;
  private connection: mysql.Connection | null = null;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await mysql.createConnection(dbConfig);
    }
    return this.connection;
  }

  public async createTrialUser(userData: {
    customerName: string;
    whatsappNumber: string;
  }): Promise<User> {
    const connection = await this.getConnection();

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 3); // 3 days trial

    const licenseKey = this.generateLicenseKey();
    const userId = this.generateUserId();

    const user: Partial<User> = {
      customer_name: userData.customerName,
      whatsapp_number: userData.whatsappNumber,
      license_key: licenseKey,
      act_date: now.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      deleted_key: 'no',
      life_time: '3',
      plan_type: 'trial',
      archive: 'false',
      created_at: now.toISOString(),
      removal_manual: 'false',
      status: 'true',
      plan: 'true',
      user_id: userId,
      pro: 'true',
      subscription: 'false'
    };

    const [result] = await connection.execute(
      'INSERT INTO users SET ?',
      [user]
    );

    return {
      ...user,
      id: (result as any).insertId
    } as User;
  }

  private generateLicenseKey(): string {
    return 'LIC-' + Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  private generateUserId(): string {
    return 'USR-' + Math.random().toString(36).substring(2, 15);
  }
}

export default DatabaseService.getInstance();
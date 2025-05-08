import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface User {
  id?: string;
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
  archive: boolean;
  created_at?: string;
  modified_at?: string;
  device_name?: string;
  removed_at?: string;
  removal_manual: boolean;
  removed_manual_at?: string;
  build_version?: string;
  pc_id?: string;
  status: boolean;
  plan: boolean;
  user_id: string;
  pro: boolean;
  subscription: boolean;
  chatgpt_key?: string;
  userdata?: string;
}

class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async createTrialUser(userData: {
    customerName: string;
    whatsappNumber: string;
  }): Promise<User> {
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 3); // 3 days trial

    const licenseKey = this.generateLicenseKey();
    const userId = this.generateUserId();

    const user: User = {
      customer_name: userData.customerName,
      whatsapp_number: userData.whatsappNumber,
      license_key: licenseKey,
      act_date: now.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      deleted_key: 'no',
      life_time: '3',
      plan_type: 'trial',
      archive: false,
      removal_manual: false,
      status: true,
      plan: true,
      user_id: userId,
      pro: true,
      subscription: false
    };

    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private generateLicenseKey(): string {
    return 'LIC-' + Math.random().toString(36).substring(2, 15).toUpperCase();
  }

  private generateUserId(): string {
    return 'USR-' + Math.random().toString(36).substring(2, 15);
  }
}

export default DatabaseService.getInstance();
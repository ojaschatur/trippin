import { Settings, User, Bell, Shield, Wallet } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] overflow-y-auto">
      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full space-y-8">
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-sm text-zinc-400">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Settings Sidebar Nav */}
          <div className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-white/[0.08] text-white">
              <User className="h-4 w-4" /> Account
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-not-allowed opacity-50">
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-not-allowed opacity-50">
              <Shield className="h-4 w-4" /> Privacy
            </button>
            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-not-allowed opacity-50">
              <Wallet className="h-4 w-4" /> Billing
            </button>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 space-y-6">
            
            <div className="rounded-xl border border-white/[0.08] bg-[#111113] overflow-hidden">
              <div className="p-5 border-b border-white/[0.08]">
                <h3 className="text-sm font-medium text-white">Profile Information</h3>
                <p className="text-xs text-zinc-500 mt-1">This is how others will see you on Trippin.</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Display Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ojas"
                    className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="ojas@example.com"
                    disabled
                    className="w-full bg-[#0a0a0a]/50 border border-white/[0.04] rounded-lg px-3 py-2 text-sm text-zinc-500 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-zinc-600">Email cannot be changed right now.</p>
                </div>
              </div>
              <div className="p-4 border-t border-white/[0.08] bg-[#0a0a0a]/50 flex justify-end">
                <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-medium hover:bg-zinc-200 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-[#111113] overflow-hidden">
              <div className="p-5 border-b border-red-500/10">
                <h3 className="text-sm font-medium text-red-400">Danger Zone</h3>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Delete Account</h4>
                  <p className="text-xs text-zinc-500 mt-1">Permanently delete your account and all trips.</p>
                </div>
                <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-500/20 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

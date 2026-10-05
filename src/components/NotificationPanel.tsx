import React from 'react';
import { NotificationItem } from '../types/campus';
import { localStorageService } from '../services/localStorageService';
import { Bell, CheckCheck, Clock, Trash2, ArrowUpRight, X } from 'lucide-react';
import { showToast } from './Toast';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectComplaint: (complaintId: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectComplaint,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    localStorageService.markAllNotificationsAsRead();
    showToast('All notifications marked as read', 'info');
  };

  const handleItemClick = (n: NotificationItem) => {
    localStorageService.markNotificationAsRead(n.id);
    if (n.complaintId) {
      onSelectComplaint(n.complaintId);
      onClose();
    }
  };

  const handleClearAll = () => {
    localStorageService.clearNotifications();
    showToast('Notifications cleared', 'info');
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-lg">
            <Bell className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer flex items-center gap-1"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 dark:text-slate-500">
            <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium">No notifications right now</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Updates on your maintenance complaints will appear here</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n)}
              className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-start gap-3 text-left relative ${
                !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  !n.read ? 'bg-blue-600 dark:bg-blue-400 ring-4 ring-blue-100 dark:ring-blue-950' : 'bg-transparent'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className={`text-xs font-semibold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {n.timeAgo}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug line-clamp-2">{n.message}</p>
                {n.complaintId && (
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <span>View {n.complaintId}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-2.5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-center flex items-center justify-between px-4">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Showing recent updates</span>
          <button
            onClick={handleClearAll}
            className="text-[11px] text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" /> Clear list
          </button>
        </div>
      )}
    </div>
  );
};

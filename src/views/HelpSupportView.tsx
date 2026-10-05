import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { showToast } from '../components/Toast';

interface HelpSupportViewProps {
  onNavigate: (view: string) => void;
}

export const HelpSupportView: React.FC<HelpSupportViewProps> = () => {
  const faqs = [
    {
      q: 'How do I report an issue?',
      a: 'Click "Report Issue" in the sidebar navigation or from the Home banner. Select the relevant category (e.g. Electrical, Plumbing, Equipment), select the floor/room location, describe the problem, optionally upload a photo, and click "Submit Complaint". A unique ticket reference (e.g. #CM-0129) will be generated instantly.',
    },
    {
      q: 'How can I track my complaint?',
      a: 'You can navigate to "Track Status" in the sidebar and enter your ticket ID (e.g. CM-0128). You can also click on any complaint under "My Complaints" or on the "Recent Complaints" table on the Home dashboard to view the full live timeline and maintenance crew notes.',
    },
    {
      q: 'How long does complaint resolution take?',
      a: 'Urgent safety hazards (electrical sparks, severe water leakage) are attended within 2 to 4 hours. High priority classroom repairs (projectors, fans) are resolved within 24 hours. General carpentry and routine furniture maintenance typically take 48 to 72 hours.',
    },
    {
      q: 'Can I edit a complaint after submission?',
      a: 'Once submitted, a complaint enters the official estates maintenance audit trail. While the core ticket description cannot be altered to preserve history, department officers can append maintenance notes, and you can contact the department desk with additional information.',
    },
    {
      q: 'What happens after submitting a complaint?',
      a: '1. The ticket is immediately routed to the designated department and maintenance dispatch.\n2. A maintenance supervisor inspects the site and assigns specialized technicians (e.g. electrician, plumber).\n3. You receive status updates ("In Progress", "Resolved") in your notification panel in real-time.\n4. Once repairs are completed and verified, the ticket is closed as "Resolved".',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) {
      showToast('Please type a brief message', 'error');
      return;
    }
    showToast('Your message has been sent to Campus Administration!', 'success');
    setContactSubject('');
    setContactMsg('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
          <HelpCircle className="w-4 h-4" />
          <span>Support & Knowledge Center</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Help, Guidelines & Administration Contact
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Everything you need to know about campus maintenance protocols, SLAs, and emergency assistance.
        </p>
      </div>

      {/* Guidelines Card */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 dark:from-blue-950 dark:to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border dark:border-slate-800">
        <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-400" />
          <span>VELS Campus Care Guidelines & Code of Maintenance</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="font-bold text-blue-200 block text-sm">1. Accurate Location</span>
            <p className="text-slate-300 leading-relaxed">
              Always specify the exact building block, floor number, and classroom or lab room number to avoid dispatch delays.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="font-bold text-amber-200 block text-sm">2. Priority Tagging</span>
            <p className="text-slate-300 leading-relaxed">
              Reserve "Urgent" priority strictly for active electrical hazards, severe pipe bursts, or hazards threatening personal safety.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="font-bold text-emerald-200 block text-sm">3. Visual Proof</span>
            <p className="text-slate-300 leading-relaxed">
              Attaching a clear photograph helps the engineering crew bring the exact replacement fixtures on the first visit.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 space-y-4 transition-colors">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Quick answers to common questions about ticket handling</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-800 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Admin & Emergency Maintenance Desk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 space-y-4 transition-colors">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Contact Campus Estates Administration</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            For critical building emergencies, immediate water shutoffs, or physical inquiries:
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Physical Location:</span>
                <span className="text-slate-600 dark:text-slate-400">
                  Floor 2, Administration Wing, Room 204, VELS University Campus, Pallavaram, Chennai
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Emergency Maintenance Hotline:</span>
                <a href="tel:+914422662500" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  +91 (044) 2266 2500 / 2501 (Ext: 204)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Official Support Email:</span>
                <a href="mailto:campuscare@vels.edu.in" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  campuscare@vels.edu.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Operational Hours:</span>
                <span className="text-slate-600 dark:text-slate-400">
                  General Maintenance: Mon - Sat 8:00 AM - 6:00 PM <br />
                  Emergency Breakdown Crew: 24 Hours / 7 Days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Administration Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-6 space-y-4 transition-colors">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Send Direct Inquiry to Estates Dean</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Send inquiries, escalation requests or general campus infrastructure suggestions.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                placeholder="e.g. Inquiry regarding water filter maintenance"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Message</label>
              <textarea
                rows={4}
                required
                placeholder="Type your message or escalation details here..."
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

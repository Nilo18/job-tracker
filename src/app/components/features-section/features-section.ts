import { Component } from '@angular/core';

@Component({
  selector: 'app-features-section',
  standalone: false,
  templateUrl: './features-section.html',
  styleUrl: './features-section.scss',
})
export class FeaturesSection {
  features: any[] = [
    {
      title: 'Application Tracking',
      desc: 'Keep track of every application with detailed status updates and notes.',
      iconBg: 'rgba(99, 102, 241, 0.1)',
      iconColor: '#6366f1',
      // Circle with checkmark
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Visualize your job search progress with intuitive stats and insights.',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8b5cf6',
      // Bar chart
      iconPath: 'M3 3v18h18M7 16v-4m4 4V8m4 8v-7',
    },
    {
      title: 'Smart Reminders',
      desc: 'Never miss a follow-up with automated notifications and reminders.',
      iconBg: 'rgba(34, 197, 94, 0.1)',
      iconColor: '#22c55e',
      // Bell
      iconPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    },
    {
      title: 'Secure & Private',
      desc: 'Your data is encrypted and protected with enterprise-grade security.',
      iconBg: 'rgba(249, 115, 22, 0.1)',
      iconColor: '#f97316',
      // Shield
      iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
  ];
}

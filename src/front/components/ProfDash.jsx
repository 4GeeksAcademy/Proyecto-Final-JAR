import React, { useEffect, useState } from "react";
import "../../front/profdash.css"; // asumimos que lo compartís

const sampleApplications = [
  { id: 1, post: { id: 101, title: 'E-commerce Mobile-First UI Design', city: 'Madrid', country: 'Spain', estimated_budget: '$30 - $60', date: '2025-06-12', isActive: true }, message: 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.', status: 'IN_PROCESS' },
  { id: 2, post: { id: 102, title: 'Conversion Funnel Optimization', city: 'Buenos Aires', country: 'Argentina', estimated_budget: '$25 - $55', date: '2025-06-15', isActive: true }, message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', status: 'ACCEPTED' },
  { id: 3, post: { id: 103, title: 'AI Automation Solutions', city: 'Paris', country: 'France', estimated_budget: '$60 - $120', date: '2025-06-21', isActive: true }, message: 'Built AI-powered tools to automate data processing workflows, reducing manual effort by 70%.', status: 'IN_PROCESS' },
  { id: 4, post: { id: 104, title: 'International Project Management', city: 'Bogotá', country: 'Colombia', estimated_budget: '$40 - $80', date: '2025-06-18', isActive: false }, message: 'Managed cross-border teams across 3 continents, ensuring on-time delivery.', status: 'REJECTED' },
  { id: 5, post: { id: 105, title: 'Brand Identity for Online Stores', city: 'Rome', country: 'Italy', estimated_budget: '$35 - $70', date: '2025-06-22', isActive: false }, message: 'Developed cohesive brand guidelines for multiple e-commerce brands, including logo, palette, and typography.', status: 'ACCEPTED' },
  { id: 6, post: { id: 106, title: 'Marketing Strategy Consulting', city: 'London', country: 'UK', estimated_budget: '$45 - $90', date: '2025-06-25', isActive: true }, message: 'Advised startups on go-to-market strategies and brand positioning.', status: 'IN_PROCESS' },
  { id: 7, post: { id: 107, title: 'Mobile App QA Testing', city: 'Berlin', country: 'Germany', estimated_budget: '$20 - $40', date: '2025-06-28', isActive: false }, message: 'Performed end-to-end testing for multiple mobile applications.', status: 'REJECTED' }
];

const statusLabels = {
  IN_PROCESS: 'In Progress',
  ACCEPTED:   'Accepted',
  REJECTED:   'Rejected',
};

export const ProfessionalDashboard = () => {
  const [applications] = useState(sampleApplications);

  // split active vs. past
  const activeApps = applications.filter(app => app.post.isActive);
  const pastApps   = applications.filter(app => !app.post.isActive);

  const renderCard = (app) => {
    const { post } = app;
    return (
      <div
        key={app.id}
        className={`card app-card p-4 shadow-sm ${!post.isActive ? 'inactive-card' : ''}`}
      >
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="post-title">{post.title}</h5>
            <span className={`post-status-badge ${post.isActive ? 'active' : 'inactive'}`}>
              {post.isActive ? 'Active Offer' : 'Closed Offer'}
            </span>
          </div>
          <span className={`status badge status-${app.status.toLowerCase()}`}>
            {statusLabels[app.status]}
          </span>
        </div>
        <div className="card-body">
          <p className="post-info">📍 {post.city}, {post.country}</p>
          <p className="post-budget">💰 {post.estimated_budget}</p>
          <p className="post-date">📅 {post.date}</p>
          <p className="app-message">"{app.message}"</p>
        </div>
        <div className="card-footer text-end">
          <button
            className="btn btn-link btn-sm"
            onClick={() => window.location.href = `/offers/${post.id}`}
          >
            View Offer Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="professional-dashboard">
      <h2 className="dashboard-title">My Active Applications</h2>
      <div className="applications-grid">
        {activeApps.map(renderCard)}
      </div>

      <h2 className="dashboard-title mt-5">My Past Applications</h2>
      <div className="applications-grid">
        {pastApps.map(renderCard)}
      </div>
    </div>
  );
};
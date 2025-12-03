'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function CapacitiStyleTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, skills, references, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';
  
  // Dark blue sidebar color
  const sidebarColor = '#1e3a5f';
  const sidebarAccent = '#7c3aed';

  return (
    <div style={{ fontFamily: fontFamily, display: 'flex', minHeight: '100%', position: 'relative' }}>
      {/* Left Sidebar - Dark Blue */}
      <div style={{ width: '35%', backgroundColor: sidebarColor, color: 'white', padding: '40px 30px', position: 'relative' }}>
        {/* Purple accent triangle */}
        <div style={{ position: 'absolute', top: '0', left: '0', width: '0', height: '0', borderLeft: '60px solid ' + sidebarAccent, borderBottom: '60px solid transparent' }}></div>
        
        {/* Name Section */}
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.2' }}>
            {personal.fullName.split(' ')[0]}<br />{personal.fullName.split(' ').slice(1).join(' ')}
          </h1>
        </div>

        {/* Personal Details */}
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: 'white' }}>Personal Details</h2>
          <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#cbd5e1' }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', color: 'white', marginBottom: '3px' }}>Age:</div>
              <div>25 years</div>
            </div>
            {personal.address && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: '600', color: 'white', marginBottom: '3px' }}>Location:</div>
                <div>{personal.address}</div>
              </div>
            )}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', color: 'white', marginBottom: '3px' }}>Languages:</div>
              <div>English, Xhosa</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', color: 'white', marginBottom: '3px' }}>Drivers Licence:</div>
              <div>No</div>
            </div>
          </div>
        </div>

        {/* Online Presence */}
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: 'white' }}>Online Presence</h2>
          <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#cbd5e1' }}>
            {personal.linkedin && (
              <div style={{ marginBottom: '8px' }}>• LinkedIn: <span style={{ color: '#60a5fa' }}>{personal.linkedin}</span></div>
            )}
            {personal.portfolio && (
              <div style={{ marginBottom: '8px' }}>• Portfolio: <span style={{ color: '#60a5fa' }}>{personal.portfolio}</span></div>
            )}
          </div>
        </div>

        {/* Technical Proficiencies */}
        {skills?.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: 'white' }}>Technical Proficiencies</h2>
            <ul style={{ fontSize: '11px', lineHeight: '1.8', color: '#cbd5e1', paddingLeft: '20px', margin: '0' }}>
              {skills.slice(0, 4).map(skill => (
                <li key={skill} style={{ marginBottom: '5px' }}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Soft Skills */}
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: 'white' }}>Soft Skills</h2>
          <ul style={{ fontSize: '11px', lineHeight: '1.8', color: '#cbd5e1', paddingLeft: '20px', margin: '0' }}>
            <li style={{ marginBottom: '5px' }}>Communication</li>
            <li style={{ marginBottom: '5px' }}>Critical Thinking</li>
            <li style={{ marginBottom: '5px' }}>Time Management</li>
            <li style={{ marginBottom: '5px' }}>Problem-Solving</li>
          </ul>
        </div>

        {/* Interests */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: 'white' }}>Interests</h2>
          <ul style={{ fontSize: '11px', lineHeight: '1.8', color: '#cbd5e1', paddingLeft: '20px', margin: '0' }}>
            <li>Playing a keyboard</li>
          </ul>
        </div>

        {/* Bottom Purple/Red accent */}
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '80px', background: 'linear-gradient(135deg, ' + sidebarAccent + ' 0%, #ef4444 100%)' }}></div>
      </div>

      {/* Right Content Area - White */}
      <div style={{ width: '65%', backgroundColor: 'white', padding: '40px 35px', color: '#374151' }}>
        {/* AI-POWERED Logo/Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
          <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, ' + sidebarAccent + ' 0%, #ef4444 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '0', color: '#1e3a5f', letterSpacing: '2px' }}>AI-POWERED</h1>
        </div>

        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '30px', fontSize: '11px', lineHeight: '1.7', color: '#6b7280' }}>
            <p style={{ margin: '0' }}>{summary}</p>
          </div>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a5f', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
              <span style={{ fontSize: '24px', color: '#ef4444' }}>»</span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '15px', paddingLeft: '35px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', margin: '0 0 5px 0', color: '#111827' }}>
                  {edu.degree} ({edu.school})
                </h3>
                <p style={{ fontSize: '11px', margin: '0', color: '#6b7280' }}>
                  {edu.duration}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Work Experience Section */}
        {experience?.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a5f', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
              <span style={{ fontSize: '24px', color: '#ef4444' }}>»</span>
              Work Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '20px', paddingLeft: '35px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 5px 0', color: '#111827' }}>
                  {exp.jobRole} at {exp.company}
                </h3>
                <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#4b5563', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
              </div>
            ))}
          </section>
        )}

        {/* Achievements Section */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a5f', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
            <span style={{ fontSize: '24px', color: '#ef4444' }}>»</span>
            Achievements and Key Projects
          </h2>
          <div style={{ paddingLeft: '35px', fontSize: '11px', lineHeight: '1.7', color: '#4b5563' }}>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>AI-Powered Resume Builder</li>
              <li style={{ marginBottom: '8px' }}>AI-Powered Chatbot</li>
              <li style={{ marginBottom: '8px' }}>Content Creator Platform</li>
            </ul>
          </div>
        </section>

        {/* References Section */}
        {references?.length > 0 && (
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a5f', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
              <span style={{ fontSize: '24px', color: '#ef4444' }}>»</span>
              References
            </h2>
            {references.map((ref) => (
              <div key={ref.id} style={{ paddingLeft: '35px', marginBottom: '10px', fontSize: '11px', color: '#4b5563' }}>
                <span style={{ fontWeight: '600', color: '#111827' }}>{ref.company}</span> - {ref.name} ({ref.phone})
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

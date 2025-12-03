'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function AiPoweredTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, skills, references, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  return (
    <div style={{ fontFamily: fontFamily, color: '#1f2937', fontSize: '11px', position: 'relative' }}>
      {/* AI-POWERED Badge */}
      <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: accentColor, color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
        AI-POWERED
      </div>

      {/* Header Section */}
      <div style={{ backgroundColor: '#f8fafc', padding: '40px 30px 30px', borderBottom: `3px solid ${accentColor}` }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0', color: '#111827', letterSpacing: '-0.5px' }}>{personal.fullName}</h1>
        <p style={{ fontSize: '16px', margin: '8px 0 0 0', color: accentColor, fontWeight: '600' }}>{personal.jobTitle}</p>
      </div>

      {/* Contact Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '15px 30px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', fontSize: '10px', color: '#6b7280' }}>
        {personal.email && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: '600' }}>Email:</span> {personal.email}
        </div>}
        {personal.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: '600' }}>Phone:</span> {personal.phone}
        </div>}
        {personal.address && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: '600' }}>Location:</span> {personal.address}
        </div>}
        {personal.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: '600' }}>LinkedIn:</span> {personal.linkedin}
        </div>}
        {personal.portfolio && <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: '600' }}>Portfolio:</span> {personal.portfolio}
        </div>}
      </div>

      <div style={{ display: 'flex', gap: '0' }}>
        {/* Left Sidebar */}
        <div style={{ width: '35%', backgroundColor: '#f9fafb', padding: '30px 25px', borderRight: '1px solid #e5e7eb' }}>
          {skills?.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '15px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '8px' }}>Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {skills.map(skill => (
                  <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: accentColor, borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '11px', color: '#374151' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education?.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '15px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '8px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '700', margin: '0 0 4px 0', color: '#111827' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '11px', margin: '2px 0', color: '#4b5563', fontWeight: '600' }}>{edu.school}</p>
                  <p style={{ fontSize: '10px', margin: '2px 0', color: '#6b7280' }}>{edu.field}</p>
                  <p style={{ fontSize: '10px', margin: '4px 0 0 0', color: '#9ca3af', fontStyle: 'italic' }}>{edu.duration}</p>
                </div>
              ))}
            </div>
          )}

          {references?.length > 0 && (
            <div>
              <h2 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '15px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '8px' }}>References</h2>
              {references.map((ref) => (
                <div key={ref.id} style={{ marginBottom: '15px', padding: '12px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: '700', margin: '0', color: '#111827' }}>{ref.name}</h3>
                  <p style={{ fontSize: '10px', margin: '3px 0', color: '#6b7280', fontStyle: 'italic' }}>{ref.title}</p>
                  <p style={{ fontSize: '10px', margin: '2px 0', color: '#6b7280' }}>{ref.company}</p>
                  <p style={{ fontSize: '9px', margin: '6px 0 0 0', color: '#9ca3af' }}>{ref.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ width: '65%', padding: '30px' }}>
          {summary && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '4px', height: '20px', backgroundColor: accentColor, display: 'inline-block' }}></span>
                Professional Summary
              </h2>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#374151', fontSize: '11px' }}>{summary}</p>
            </section>
          )}
          
          {experience?.length > 0 && (
            <section>
              <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '20px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '4px', height: '20px', backgroundColor: accentColor, display: 'inline-block' }}></span>
                Work Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={exp.id} style={{ marginBottom: '25px', paddingBottom: index < experience.length - 1 ? '25px' : '0', borderBottom: index < experience.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0', color: '#111827' }}>{exp.jobRole}</h3>
                      <p style={{ fontSize: '12px', color: accentColor, margin: '4px 0', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <div style={{ backgroundColor: '#f3f4f6', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', color: '#6b7280', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                      {exp.duration}
                    </div>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#4b5563', fontSize: '11px', marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '15px 30px', backgroundColor: '#f8fafc', borderTop: '1px solid #e5e7eb', textAlign: 'center', fontSize: '9px', color: '#9ca3af' }}>
        <p style={{ margin: '0' }}>This resume was generated using AI-powered technology</p>
      </div>
    </div>
  );
}

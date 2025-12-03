'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function ElegantTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, skills, references, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  return (
    <div style={{ fontFamily: fontFamily, color: '#1f2937', fontSize: '12px', maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: '50px 40px 40px', borderBottom: `3px double ${accentColor}` }}>
        <h1 style={{ fontSize: '38px', margin: '0', fontWeight: '400', letterSpacing: '3px', textTransform: 'uppercase', color: accentColor }}>{personal.fullName}</h1>
        <p style={{ fontSize: '15px', margin: '15px 0 20px 0', color: '#6b7280', letterSpacing: '1px' }}>{personal.jobTitle}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', color: '#6b7280', flexWrap: 'wrap' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>•</span>}
          {personal.address && <span>{personal.address}</span>}
        </div>
        {(personal.linkedin || personal.portfolio) && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', color: '#6b7280', marginTop: '8px', flexWrap: 'wrap' }}>
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.linkedin && personal.portfolio && <span>•</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        )}
      </div>

      <div style={{ padding: '40px' }}>
        {summary && (
          <section style={{ marginBottom: '35px', textAlign: 'center' }}>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#4b5563', fontSize: '13px', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>{summary}</p>
          </section>
        )}
        
        {experience?.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px', color: accentColor, marginBottom: '20px', fontWeight: '400', textAlign: 'center', paddingBottom: '10px', borderBottom: `1px solid ${accentColor}` }}>Professional Experience</h2>
            {experience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: '25px', paddingBottom: index < experience.length - 1 ? '25px' : '0', borderBottom: index < experience.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '0', color: '#111827' }}>{exp.jobRole}</h3>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0', fontStyle: 'italic' }}>{exp.company}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '20px' }}>{exp.duration}</span>
                </div>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#4b5563', fontSize: '12px', marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {education?.length > 0 && (
            <section>
              <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px', color: accentColor, marginBottom: '15px', fontWeight: '400', paddingBottom: '8px', borderBottom: `1px solid ${accentColor}` }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', margin: '0', color: '#111827' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '12px', margin: '4px 0', color: '#6b7280' }}>{edu.school}</p>
                  <p style={{ fontSize: '11px', margin: '2px 0', color: '#9ca3af' }}>{edu.duration}</p>
                </div>
              ))}
            </section>
          )}

          {skills?.length > 0 && (
            <section>
              <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px', color: accentColor, marginBottom: '15px', fontWeight: '400', paddingBottom: '8px', borderBottom: `1px solid ${accentColor}` }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map(skill => (
                  <span key={skill} style={{ fontSize: '11px', color: '#4b5563', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '20px' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {references?.length > 0 && (
          <section style={{ marginTop: '35px' }}>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px', color: accentColor, marginBottom: '20px', fontWeight: '400', textAlign: 'center', paddingBottom: '10px', borderBottom: `1px solid ${accentColor}` }}>References</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {references.map((ref) => (
                <div key={ref.id} style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '600', margin: '0', color: '#111827' }}>{ref.name}</h3>
                  <p style={{ fontSize: '11px', margin: '6px 0 2px 0', color: '#6b7280', fontStyle: 'italic' }}>{ref.title}</p>
                  <p style={{ fontSize: '11px', margin: '2px 0', color: '#6b7280' }}>{ref.company}</p>
                  <p style={{ fontSize: '10px', margin: '8px 0 0 0', color: '#9ca3af' }}>{ref.email}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

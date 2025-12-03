'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function BoldTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, skills, references, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  return (
    <div style={{ fontFamily: fontFamily, color: '#111827', fontSize: '12px' }}>
      <div style={{ backgroundColor: accentColor, color: 'white', padding: '40px 30px' }}>
        <h1 style={{ fontSize: '40px', margin: '0', fontWeight: '700', letterSpacing: '-0.5px' }}>{personal.fullName}</h1>
        <p style={{ fontSize: '18px', margin: '10px 0 0 0', opacity: '0.95' }}>{personal.jobTitle}</p>
      </div>

      <div style={{ display: 'flex', gap: '0' }}>
        <div style={{ width: '30%', backgroundColor: '#f9fafb', padding: '30px 20px' }}>
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h2>
            <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#4b5563' }}>
              {personal.email && <p style={{ margin: '5px 0', wordBreak: 'break-word' }}>{personal.email}</p>}
              {personal.phone && <p style={{ margin: '5px 0' }}>{personal.phone}</p>}
              {personal.address && <p style={{ margin: '5px 0' }}>{personal.address}</p>}
              {personal.linkedin && <p style={{ margin: '5px 0', wordBreak: 'break-word' }}>{personal.linkedin}</p>}
              {personal.portfolio && <p style={{ margin: '5px 0', wordBreak: 'break-word' }}>{personal.portfolio}</p>}
            </div>
          </div>

          {skills?.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skills.map(skill => (
                  <div key={skill} style={{ backgroundColor: 'white', padding: '8px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education?.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px', fontSize: '11px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>{edu.degree}</h3>
                  <p style={{ margin: '2px 0', color: '#6b7280' }}>{edu.school}</p>
                  <p style={{ margin: '2px 0', color: '#9ca3af', fontSize: '10px' }}>{edu.duration}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: '70%', padding: '30px' }}>
          {summary && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>About</h2>
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#374151' }}>{summary}</p>
            </section>
          )}
          
          {experience?.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '0', color: '#111827' }}>{exp.jobRole}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>{exp.company}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{exp.duration}</span>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#4b5563', fontSize: '11px' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
                </div>
              ))}
            </section>
          )}

          {references?.length > 0 && (
            <section>
              <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '15px', color: accentColor, textTransform: 'uppercase', letterSpacing: '1px' }}>References</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {references.map((ref) => (
                  <div key={ref.id} style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '6px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', margin: '0' }}>{ref.name}</h3>
                    <p style={{ fontSize: '11px', margin: '4px 0', color: '#6b7280' }}>{ref.title}</p>
                    <p style={{ fontSize: '11px', margin: '2px 0', color: '#6b7280' }}>{ref.company}</p>
                    <p style={{ fontSize: '10px', margin: '8px 0 0 0', color: '#9ca3af' }}>{ref.email}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

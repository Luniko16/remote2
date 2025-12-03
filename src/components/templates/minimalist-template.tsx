'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function MinimalistTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, skills, references, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  return (
    <div style={{ fontFamily: fontFamily, color: '#1f2937', fontSize: '12px', maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '36px', margin: '0', fontWeight: '300', letterSpacing: '0.5px' }}>{personal.fullName}</h1>
        <p style={{ fontSize: '14px', margin: '8px 0', color: '#6b7280', fontWeight: '300' }}>{personal.jobTitle}</p>
        <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: '#6b7280', marginTop: '10px', flexWrap: 'wrap' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '10px', fontWeight: '600' }}>Profile</h2>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#4b5563' }}>{summary}</p>
        </section>
      )}
      
      {experience?.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '15px', fontWeight: '600' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>{exp.jobRole}</h3>
                <span style={{ fontSize: '11px', color: '#6b7280', whiteSpace: 'nowrap' }}>{exp.duration}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 8px 0' }}>{exp.company}</p>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#4b5563', fontSize: '11px' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '15px', fontWeight: '600' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>{edu.school}</h3>
                <span style={{ fontSize: '11px', color: '#6b7280', whiteSpace: 'nowrap' }}>{edu.duration}</span>
              </div>
              <p style={{ fontSize: '12px', margin: '2px 0', color: '#6b7280' }}>{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '10px', fontWeight: '600' }}>Skills</h2>
          <p style={{ color: '#4b5563', lineHeight: '1.8' }}>{skills.join(' • ')}</p>
        </section>
      )}

      {references?.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: accentColor, marginBottom: '15px', fontWeight: '600' }}>References</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {references.map((ref) => (
              <div key={ref.id}>
                <h3 style={{ fontSize: '13px', fontWeight: '600', margin: '0' }}>{ref.name}</h3>
                <p style={{ fontSize: '11px', margin: '2px 0', color: '#6b7280' }}>{ref.title}</p>
                <p style={{ fontSize: '11px', margin: '2px 0', color: '#6b7280' }}>{ref.company}</p>
                <p style={{ fontSize: '10px', margin: '5px 0 0 0', color: '#9ca3af' }}>{ref.email}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

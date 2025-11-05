
'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function ModernTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, skills, references, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  return (
    <div style={{ fontFamily: fontFamily, color: '#374151', fontSize: '12px', display: 'flex', gap: '20px' }}>
      {/* Left Column */}
      <div style={{ width: '35%', borderRight: `2px solid ${accentColor}`, paddingRight: '20px' }}>
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h1 style={{ color: accentColor, fontSize: '28px', margin: '0', textTransform: 'uppercase', lineHeight: '1.2' }}>{personal.fullName}</h1>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>{personal.jobTitle}</p>
        </div>
        
        <h2 style={{ color: accentColor, fontSize: '16px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>CONTACT</h2>
        <p style={{ marginBottom: '5px' }}>{personal.email}</p>
        <p style={{ marginBottom: '5px' }}>{personal.phone}</p>
        <p style={{ marginBottom: '15px' }}>{personal.address}</p>
        {personal.linkedin && <p style={{ marginBottom: '5px' }}>{personal.linkedin}</p>}
        {personal.portfolio && <p style={{ marginBottom: '15px' }}>{personal.portfolio}</p>}

        {skills?.length > 0 && (
            <section style={{marginBottom: '20px'}}>
            <h2 style={{ color: accentColor, fontSize: '16px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>SKILLS</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {skills.map(skill => <li key={skill} style={{ marginBottom: '5px' }}>{skill}</li>)}
            </ul>
            </section>
        )}

        {education?.length > 0 && (
            <section style={{marginBottom: '20px'}}>
            <h2 style={{ color: accentColor, fontSize: '16px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>EDUCATION</h2>
            {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0' }}>{edu.school}</h3>
                <p style={{ margin: '2px 0' }}>{edu.degree}</p>
                <p style={{ margin: '2px 0' }}>{edu.field}</p>
                <p style={{ margin: '2px 0' }}>{edu.duration}</p>
                </div>
            ))}
            </section>
        )}

        {references?.length > 0 && (
            <section style={{marginBottom: '20px'}}>
            <h2 style={{ color: accentColor, fontSize: '16px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>REFERENCES</h2>
            {references.map((ref) => (
                <div key={ref.id} style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0' }}>{ref.name}</h3>
                <p style={{ fontSize: '11px', margin: '1px 0', fontStyle: 'italic' }}>{ref.title} - {ref.company}</p>
                <p style={{ fontSize: '11px', margin: '1px 0' }}>{ref.email} | {ref.phone}</p>
                <p style={{ fontSize: '10px', margin: '1px 0', color: '#666' }}>{ref.relationship}</p>
                </div>
            ))}
            </section>
        )}
      </div>

      {/* Right Column */}
      <div style={{ width: '65%' }}>
        {summary && (
            <section style={{marginBottom: '20px'}}>
            <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>SUMMARY</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
            </section>
        )}
        
        {experience?.length > 0 && (
            <section style={{marginBottom: '20px'}}>
            <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>EXPERIENCE</h2>
            {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '15px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0' }}>{exp.jobRole}</h3>
                <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '2px 0' }}>{exp.company} | {exp.duration}</p>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
                </div>
            ))}
            </section>
        )}
      </div>
    </div>
  );
}

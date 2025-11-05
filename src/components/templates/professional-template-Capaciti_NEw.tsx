
'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function ProfessionalTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, projects, skills, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  return (
    <div style={{ fontFamily: fontFamily, color: '#374151', fontSize: '12px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: accentColor, fontSize: '28px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px' }}>{personal.fullName}</h1>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>{personal.jobTitle}</p>
        {(personal.email || personal.phone || personal.address) && (
          <p style={{ fontSize: '12px', margin: '0' }}>
            {personal.email}{personal.email && (personal.phone || personal.address) ? ' | ' : ''}
            {personal.phone}{personal.phone && personal.address ? ' | ' : ''}
            {personal.address}
          </p>
        )}
        {(personal.linkedin || personal.portfolio) && (
          <p style={{ fontSize: '12px', margin: '5px 0' }}>
            {personal.linkedin && <span>LinkedIn: {personal.linkedin}</span>}
            {personal.linkedin && personal.portfolio && <span> | </span>}
            {personal.portfolio && <span>Portfolio: {personal.portfolio}</span>}
          </p>
        )}
      </div>

      <hr style={{ borderColor: accentColor, borderWidth: '1px 0 0 0', margin: '20px 0' }} />

      {summary && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Summary</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
        </section>
      )}

      {experience?.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="experience-item" style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0' }}>{exp.jobRole}</h3>
              <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '2px 0' }}>{exp.company} | {exp.duration}</p>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
            </div>
          ))}
        </section>
      )}

      {education?.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="education-item" style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0' }}>{edu.school}</h3>
              <p style={{ fontSize: '12px', margin: '2px 0' }}>{edu.degree} in {edu.field} ({edu.duration})</p>
              {edu.description && <div style={{ fontSize: '12px', whiteSpace: 'pre-wrap', marginTop: '5px' }}>{edu.description}</div>}
            </div>
          ))}
        </section>
      )}

      {projects?.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="project-item" style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0' }}>
                {project.name}
                {project.link && <span style={{ fontSize: '11px', fontWeight: 'normal', marginLeft: '8px' }}>({project.link})</span>}
              </h3>
              {project.duration && <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '2px 0' }}>{project.duration}</p>}
              <p style={{ fontSize: '12px', margin: '5px 0', whiteSpace: 'pre-wrap' }}>{project.description}</p>
              {project.technologies && (
                <p style={{ fontSize: '11px', margin: '5px 0', color: '#6b7280' }}>
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {skills?.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ color: accentColor, fontSize: '18px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '5px', marginBottom: '10px' }}>Skills</h2>
          <p style={{ marginTop: '10px' }}>{skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
}

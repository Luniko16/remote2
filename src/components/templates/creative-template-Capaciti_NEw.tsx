
'use client';
import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

export function CreativeTemplate({ data }: TemplateProps) {
  const { personal, summary, experience, education, projects, skills, style } = data;
  const accentColor = style?.color || 'hsl(220, 19%, 38%)';
  const fontFamily = style?.font || 'var(--font-inter)';

  // A light version of the accent color for the header background
  const accentColorLight = accentColor.replace(')', ', 0.1)').replace('hsl', 'hsla');


  return (
    <div style={{ fontFamily: fontFamily, color: '#374151', fontSize: '12px' }}>
      <div style={{ backgroundColor: accentColorLight, padding: '30px', textAlign: 'left', marginBottom: '20px', borderLeft: `5px solid ${accentColor}` }}>
        <h1 style={{ color: accentColor, fontSize: '32px', margin: '0', textTransform: 'uppercase', letterSpacing: '1px' }}>{personal.fullName}</h1>
        <p style={{ fontSize: '16px', margin: '5px 0 0 0', color: '#555' }}>{personal.jobTitle}</p>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', padding: '0 30px' }}>
          <div style={{width: '65%'}}>
            {summary && (
                <section style={{marginBottom: '20px'}}>
                <h2 style={{ color: accentColor, fontSize: '18px', marginBottom: '10px' }}>ABOUT ME</h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{summary}</p>
                </section>
            )}
            
            {experience?.length > 0 && (
                <section style={{marginBottom: '20px'}}>
                <h2 style={{ color: accentColor, fontSize: '18px', marginBottom: '10px' }}>WORK EXPERIENCE</h2>
                {experience.map((exp) => (
                    <div key={exp.id} className="experience-item" style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0' }}>{exp.jobRole}</h3>
                    <p style={{ fontSize: '12px', fontStyle: 'italic', margin: '2px 0' }}>{exp.company} | {exp.duration}</p>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: exp.description.replace(/\n/g, '<br />') }}></div>
                    </div>
                ))}
                </section>
            )}

            {projects?.length > 0 && (
                <section style={{marginBottom: '20px'}}>
                <h2 style={{ color: accentColor, fontSize: '18px', marginBottom: '10px' }}>PROJECTS</h2>
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
          </div>
          <div style={{width: '35%', borderLeft: '1px solid #ddd', paddingLeft: '20px'}}>
            <h2 style={{ color: accentColor, fontSize: '16px', marginBottom: '10px' }}>CONTACT</h2>
            <p style={{ marginBottom: '5px' }}>{personal.email}</p>
            <p style={{ marginBottom: '5px' }}>{personal.phone}</p>
            <p style={{ marginBottom: '15px' }}>{personal.address}</p>
            {personal.linkedin && <p style={{ marginBottom: '5px' }}>{personal.linkedin}</p>}
            {personal.portfolio && <p style={{ marginBottom: '15px' }}>{personal.portfolio}</p>}

            {education?.length > 0 && (
                <section style={{marginBottom: '20px'}}>
                <h2 style={{ color: accentColor, fontSize: '16px', marginBottom: '10px' }}>EDUCATION</h2>
                {education.map((edu) => (
                    <div key={edu.id} className="education-item" style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0' }}>{edu.school}</h3>
                    <p style={{ margin: '2px 0' }}>{edu.degree} in {edu.field}</p>
                    <p style={{ margin: '2px 0' }}>{edu.duration}</p>
                    </div>
                ))}
                </section>
            )}

            {skills?.length > 0 && (
                <section style={{marginBottom: '20px'}}>
                <h2 style={{ color: accentColor, fontSize: '16px', marginBottom: '10px' }}>SKILLS</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {skills.map(skill => <span key={skill} style={{ backgroundColor: '#eee', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>{skill}</span>)}
                </div>
                </section>
            )}

          </div>
      </div>
    </div>
  );
}

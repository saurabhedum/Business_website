
import { Project } from '../types';

export const downloadProjectBrief = (project: Project) => {
  const content = `
=========================================
TRISMART AUTOMATION - PROJECT BRIEF
=========================================
PROJECT: ${project.title}
SECTOR: ${project.industry}
ID: TRISMART-${project.id.padStart(4, '0')}
=========================================

EXECUTIVE SUMMARY:
${project.shortDescription}

DEEP DIVE:
${project.detailedBrief}

BUSINESS IMPACT:
${project.impact}

ESTIMATED ROI:
${project.roi}

TECHNICAL SPECIFICATIONS:
${project.specifications.map(s => `- ${s.label}: ${s.value}`).join('\n')}

TECHNOLOGY STACK:
${project.techStack.join(', ')}

SIMULATION DATA:
- Complexity Score: ${project.prototypeData.complexity}/100
- Active Sensor Nodes: ${project.prototypeData.sensorCount}
- System Latency: ${project.prototypeData.latency}

-----------------------------------------
(c) 2026 TriSmart Automation Excellence
Generated via TriSmart Digital Hub
-----------------------------------------
  `;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `TRISMART_BRIEF_${project.id}_${project.title.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

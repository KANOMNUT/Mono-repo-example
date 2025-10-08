import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as SI from 'react-icons/si'

const styles = {
  section: "text-center font-mono sm:mb-20 mb-20 text-black",
  title: "text-3xl font-medium capitalize mb-8 text-center",
  skillList: "flex flex-wrap justify-center gap-2 text-lg text-gray-800",
  skillItem: "bg-white border border-black/[0.1] rounded-xl px-4 py-2 flex items-center hover:scale-[1.15]",
  icon: "mr-2",
  titleInterested: "text-3xl font-medium capitalize mb-8 text-center mt-12"
};

const skillsData = [
  { icon: SI.SiMicrosoftazure, name: "Azure" },
  { icon: SI.SiGooglecloud, name: "GCP" },
  { icon: SI.SiTerraform, name: "Terraform" },
  { icon: SI.SiGitlab, name: "Gitlab" },
  { icon: SI.SiGit, name: "Git" },
  { icon: SI.SiKubernetes, name: "Kuberbetes" },
  { icon: SI.SiArgo, name: "ArgoCD" },
  { icon: SI.SiHelm, name: "HelmChart" },
  { icon: SI.SiDocker, name: "Docker" },
  { icon: SI.SiPrometheus, name: "Prometheus" },
  { icon: SI.SiGrafana, name: "Grafana" },
  { icon: SI.SiOpentelemetry, name: "OpenteleMetry" },
  { icon: SI.SiApachekafka, name: "Kafka" },
  { icon: SI.SiLinux, name: "Linux" },
  { icon: SI.SiGnubash, name: "Bash" },
  { icon: SI.SiVmware, name: "VMWare" },
  { icon: SI.SiVeeam, name: "Veeam Backup" },
  { icon: SI.SiMongodb, name: "MongoDB" },
  { icon: SI.SiPython, name: "Python" },
  { icon: SI.SiJavascript, name: "JavaScript" },
];

const interestsData = [
  { icon: SI.SiAmazonaws, name: "AWS Cloud" },
  { icon: SI.SiJenkins, name: "Jenkins" },
  { icon: SI.SiNodedotjs, name: "Node.JS" },
  { icon: SI.SiReact, name: "React.JS" },
  { icon: SI.SiNextdotjs, name: "Next.JS" },
  { icon: SI.SiGo, name: "Golang" },
  { icon: SI.SiTailwindcss, name: "Tailwind" },
  { icon: SI.SiAnsible, name: "Ansible" },
  { icon: SI.SiPostgresql, name: "PostgreSQL" },
  { icon: SI.SiPrisma, name: "Prisma" },
];

const SkillItem = memo(({ Icon, name }) => (
  <li className={styles.skillItem}>
    <Icon className={styles.icon} />{name}
  </li>
));

SkillItem.displayName = 'SkillItem';

SkillItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
};

const SkillSection = memo(({ title, items, isInterested }) => (
  <>
    <div className={isInterested ? styles.titleInterested : styles.title}>
      {title}
    </div>
    <ul className={styles.skillList}>
      {items.map((item) => (
        <SkillItem key={item.name} Icon={item.icon} name={item.name} />
      ))}
    </ul>
  </>
));

SkillSection.displayName = 'SkillSection';

SkillSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  isInterested: PropTypes.bool,
};

const Skills = memo(() => {
  return (
    <section id="skill" className={styles.section}>
      <SkillSection title="Skills" items={skillsData} />
      <SkillSection title="Interested" items={interestsData} isInterested />
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;

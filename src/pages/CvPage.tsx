import { Link } from 'react-router-dom';
import { Home, Building2, MapPin, Calendar, Briefcase, ChevronRight } from 'lucide-react';

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Consultant Devops",
    company: "AlterWay - INRAE",
    location: "Full remote",
    startDate: "Janvier 2024",
    endDate: "Présent",
    duration: "",
    description: [
      "Optimiser et restructurer le code Ansible, garantissant des performances améliorées et une maintenance simplifiée.",
      "Superviser la mise en œuvre et l'automatisation des déploiements à l'aide de Docker, augmentant l'efficacité, opérationnelle de l'infrastructure.",
      "Fournir un soutien proactif aux autres équipes concernant l'utilisation d'Ansible, la gestion des serveurs et les technologies Docker, favorisant un environnement de collaboration efficace.",
      "Élaborer une documentation détaillée et stratégique pour les différents processus au sein de l'équipe, facilitant ainsi la compréhension et l'application des méthodes de travail."
    ]
  },
  {
    id: 2,
    title: "Consultant Devops",
    company: "Klanik - AGPM",
    location: "Full remote",
    startDate: "Février 2023",
    endDate: "Juin 2023",
    duration: "4 mois",
    description: [
      "Mettre à jour et optimiser régulièrement les pipelines GitLab CI, garantissant une intégration continue fluide et efficace des projets.",
      "Étudier, présenter et déployer un registre Harbor, facilitant le scan des vulnérabilités des images Docker, afin de renforcer la sécurité des systèmes.",
      "Concevoir et développer un script bash innovant pour automatiser les modifications en masse dans le gestionnaire de mots de passe, optimisant ainsi l\'efficacité opérationnelle.",
      "S\'intégrer au sein d'une équipe dédiée à l'industrialisation, en collaborant de manière proactive à plusieurs projets stratégiques au sein de l\' AGPM.",
    ]
  },
  {
    id: 3,
    title: "Consultant Devops",
    company: "Capgemini - Hermès",
    location: "Nantes",
    startDate: "Juillet 2021",
    endDate: "Octobre 2022",
    duration: "1,5 année",
    description: [
      "Optimiser les pipelines de builds Jenkins en intégrant des étapes de scan d'image et de Dockerfile, en utilisant l\'outil Trivy.",
      "Concevoir des pipelines Jenkins sur mesure pour satisfaire les exigences spécifiques des développeurs, améliorant ainsi l'efficacité du processus de développement.",
      "Implémenter des linter et des precommits pour garantir la qualité du code.",
      "Automatiser les processus de bootstrap EC2 sur AWS à l'aide d' Ansible et de Makefile.",
      "Automatiser la création des utilisateurs AWS IAM avec Terraform.",
      "Conteneuriser l'ensemble de la stack avec Docker pour réaliser des déploiements plus rapides et reproductibles sur nos environnements d'intégration et sur les machines des développeurs.",
      "Gérer les droits d'accès AWS, Bitbucket et Jenkins pour chaque membre du projet"
    ]
  },
  {
    id: 3,
    title: "Développeur Fullstack",
    company: "Capgemini - Air Liquide",
    location: "Nantes",
    startDate: "Mars 2019",
    endDate: "Juin 2021",
    duration: "2,5 années",
    description: [
      "Optimiser les pipelines de builds Jenkins en intégrant des étapes de scan d'image et de Dockerfile, en utilisant l\'outil Trivy.",
      "Concevoir des pipelines Jenkins sur mesure pour satisfaire les exigences spécifiques des développeurs, améliorant ainsi l'efficacité du processus de développement.",
      "Implémenter des linter et des precommits pour garantir la qualité du code.",
      "Automatiser les processus de bootstrap EC2 sur AWS à l'aide d' Ansible et de Makefile.",
      "Automatiser la création des utilisateurs AWS IAM avec Terraform.",
      "Conteneuriser l'ensemble de la stack avec Docker pour réaliser des déploiements plus rapides et reproductibles sur nos environnements d'intégration et sur les machines des développeurs.",
      "Gérer les droits d'accès AWS, Bitbucket et Jenkins pour chaque membre du projet"
    ]
  }
];

function TimelinePoint({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  return (
    <div className="relative group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 w-[3px] h-full bg-gradient-to-b from-blue-400/20 to-blue-600/20 group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-500"></div>
      )}
      
      {/* Content */}
      <div className="flex gap-8 ml-4">
        {/* Timeline point */}
        <div className="relative flex-shrink-0 mt-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* Experience card */}
        <div className="flex-1 bg-navy-800 rounded-xl p-6 mb-12 transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-blue-500/10 border border-blue-500/10 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 text-blue-400 font-medium">
                <span>{experience.company}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{experience.duration || "Actuel"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
              <span>{experience.company}</span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <span>{experience.location}</span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-400" />
              </div>
              <span>{experience.startDate} - {experience.endDate}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {experience.description.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-gray-300 group/item">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 group-hover/item:bg-blue-300 transition-colors"></div>
                <p className="flex-1 group-hover/item:text-gray-200 transition-colors">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CvPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16 px-4 sm:px-6">
      <Link 
        to="/" 
        className="fixed top-6 left-6 bg-blue-500/10 p-3 rounded-full backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300 border border-blue-400/20 z-50 group"
        aria-label="Retour à l'accueil"
      >
        <Home className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
      </Link>

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6">
            Mon Parcours Professionnel
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez mon évolution et mes expériences en tant que <b>Consultant DevOps</b> et <b>Développeur Fullstack</b>
          </p>
        </header>

        <div className="relative pl-4">
          {experiences.map((experience, index) => (
            <TimelinePoint 
              key={experience.id} 
              experience={experience} 
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import { Download, Linkedin, Mail, MapPin } from "lucide-react"
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string[]
}

const experiences: Experience[] = [
  {
    company: "AlterWay - INRAE",
    role: "Consultant Devops",
    period: "Janvier 2024 - Présent",
    location: "100% Télétravail",
    description: [
      "Optimiser et restructurer le code **Ansible**, garantissant des performances améliorées et une maintenance simplifiée.",
      "Superviser la mise en œuvre et l'automatisation des déploiements à l'aide de **Docker**, augmentant l'efficacité, opérationnelle de l'infrastructure.",
      "Fournir un soutien proactif aux autres équipes concernant l'utilisation d'**Ansible**, la gestion des serveurs et les technologies **Docker**, favorisant un environnement de collaboration efficace.",
      "Élaborer une documentation détaillée et stratégique pour les différents processus au sein de l'équipe, facilitant ainsi la compréhension et l'application des méthodes de travail.",
    ],
  },
  {
    company: "Klanik - AGPM",
    role: "Consultant Devops - Freelance",
    period: "Février 2023 - Juin 2023",
    location: "100% Télétravail",
    description: [
      "Mettre à jour et optimiser régulièrement les pipelines **GitLab CI**, garantissant une intégration continue fluide et efficace des projets.",
      "Étudier, présenter et déployer un registre Harbor, facilitant le scan des vulnérabilités des images **Docker**, afin de renforcer la sécurité des systèmes.",
      "Concevoir et développer un script bash innovant pour automatiser les modifications en masse dans le gestionnaire de mots de passe, optimisant ainsi l'efficacité opérationnelle.",
      "S'intégrer au sein d'une équipe dédiée à l'industrialisation, en collaborant de manière proactive à plusieurs projets stratégiques au sein de l' AGPM.",
    ],
  },
  {
    "company": "Capgemini - Hermès",
    "role": "Consultant Devops",
    "period": "Juillet 2021 - Octobre 2022",
    "location": "Nantes",
    "description": [
      "Optimiser les pipelines de builds **Jenkins** en intégrant des étapes de scan d'image et de **Dockerfile**, en utilisant l'outil **Trivy**.",
      "Concevoir des pipelines **Jenkins** sur mesure pour satisfaire les exigences spécifiques des développeurs, améliorant ainsi l'efficacité du processus de développement.",
      "Implémenter des linter et des precommits pour garantir la qualité du code.",
      "Automatiser les processus de bootstrap **EC2** sur **AWS** à l'aide d'**Ansible** et de Makefile.",
      "Automatiser la création des utilisateurs **AWS** **IAM** avec Terraform.",
      "Conteneuriser l'ensemble de la stack avec **Docker** pour réaliser des déploiements plus rapides et reproductibles sur nos environnements d'intégration et sur les machines des développeurs.",
      "Gérer les droits d'accès **AWS**, Bitbucket et **Jenkins** pour chaque membre du projet."
    ]
  },
  {
    "company": "Capgemini - Air Liquide",
    "role": "Développeur Fullstack",
    "period": "Mars 2019 - Juin 2021",
    "location": "Nantes",
    "description": [
      "Développement Fullstack : **Angular** et **NodeJS** (TypeScript, JavaScript, HTML, CSS).",
      "Gestion de **Keycloak** : Maintenance et développement via scripts Shell, **Localstack/AWS** et **Docker**.",
      "Automatisation : Déploiements gérés avec **Jenkins**.",
      "Collaboration : Travail quotidien avec GitLab.",
      "Outils annexes : Utilisation de **Fiddler** et **Postman**."
    ]
  }
]

export function CvPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-rose-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Link 
        to="/" 
        className="fixed top-6 right-6 bg-white/50 p-3 rounded-full backdrop-blur-sm hover:bg-white/70 
        transition-all duration-300 shadow-lg hover:scale-110"
        aria-label="Retour à l'accueil"
        >
        <Home className="w-6 h-6 text-gray-800" />
        </Link>
        <div className="text-center mb-8 items-start gap-4 sm:flex-row sm:items-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500 mb-6">
            Mon Parcours Professionnel
          </h1>
          <p className="text-xl text-stone max-w-2xl mx-auto mb-8">
            Découvrez mon évolution et mes expériences en tant que <b>Consultant DevOps</b> et <b>Développeur Fullstack</b>
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <a
              href="/CV-2025.pdf"
              download
              className="flex items-center text-sm gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300 shadow-lg shadow-blue-500/20"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger CV</span>
            </a>
            
            <a
              href="mailto:vincent.jacquet78@gmail.com"
              className="flex items-center text-sm gap-2 px-4 py-2 bg-gray-200 hover:bg-blue-400 text-white-400 hover:text-white rounded-md transition-colors duration-300 border border-blue-400/20"
            >
              <Mail className="w-5 h-5" />
              <span>Me contacter</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/vincent-jacquet/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm gap-2 px-4 py-2 bg-gray-200 hover:bg-blue-400 text-white-400 hover:text-white rounded-md transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="rounded-md bg-white border border-solid border-indigo-400 p-6 shadow-sm transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{exp.company}</h2>
                <div className="space-y-1">
                  <div className="font-medium text-gray-700">{exp.role}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">{exp.period}</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {exp.description.map((item, i) => (
                <li key={i}>
                  <ReactMarkdown>{item}</ReactMarkdown>
                </li>
              ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


import { ExternalLink } from "lucide-react";
import { seoProjects } from "@/data/seo-projects";
import { SectionHead } from "./page-shell";

export function SeoProjects() {
  return (
    <section className="sp-band" aria-labelledby="seo-projects">
      <div className="sp-wrap">
        <div id="seo-projects">
          <SectionHead
            eyebrow="Search portfolio"
            title="SEO Projects & Google Ranking Results"
            description="SEO projects, targeted keywords and Google ranking records across different industries and international markets."
          />
        </div>
        <p className="sp-note">
          Positions reproduced from our original SEO portfolio. A ranking verification date was not
          provided; these are not live Google position checks.
        </p>
        <div className="sp-grid seo-project-grid">
          {seoProjects.map((project) => (
            <article className="sp-card seo-project-card" key={project.id}>
              {project.logo && (
                <div className="seo-project-logo">
                  <img
                    src={project.logo}
                    alt={`${project.name} client logo`}
                    width={240}
                    height={100}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              <div className="sp-label">
                {project.industry}
                {project.market && ` · ${project.market}`}
              </div>
              <h3>{project.name}</h3>
              <a
                className="sp-service-link seo-project-url"
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.name}: ${project.website}`}
              >
                {new URL(project.website).hostname}
                <ExternalLink aria-hidden />
              </a>
              {project.description && <p>{project.description}</p>}
              {project.image && (
                <img
                  className="seo-project-image"
                  src={project.image}
                  alt={`${project.name} SEO project`}
                  width={640}
                  height={360}
                  loading="lazy"
                />
              )}
              <table className="seo-ranking-table">
                <caption>{project.rankingLabel}</caption>
                <thead>
                  <tr>
                    <th scope="col">Target keyword</th>
                    <th scope="col">Google position</th>
                  </tr>
                </thead>
                <tbody>
                  {project.rankings.map((ranking, i) => (
                    <tr key={`${ranking.keyword}-${ranking.position}-${i}`}>
                      <th scope="row">{ranking.keyword}</th>
                      <td>
                        <span className="seo-position">#{ranking.position}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {project.verificationDate && (
                <p className="seo-project-date">
                  Ranking verified:{" "}
                  <time dateTime={project.verificationDate}>{project.verificationDate}</time>
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

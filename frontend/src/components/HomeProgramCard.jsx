import "./homeProgramCard.css";
import { Link } from "react-router-dom";
import CanadaC from "../assets/canadaCard.avif";
import UKC from "../assets/ukCard.jpg";
import AustraliaC from "../assets/australiaCard.jpg";
import GermanyC from "../assets/germanyCard.jpg";
import JapanC from "../assets/japanCard.jpg";

const Pfeatures = [
  {
    image: CanadaC,
    title: "Canada",
    description: "120+ programs",
  },
  {
    image: UKC,
    title: "UK",
    description: "150+ programs",
  },
  {
    image: AustraliaC,
    title: "Australia",
    description: "100+ programs",
  },
  {
    image: GermanyC,
    title: "Germany",
    description: "80+ programs",
  },
  {
    image: JapanC,
    title: "Japan",
    description: "60+ programs",
  },
];

const HomeProgramCard = () => {
  return (
    <div className="program-container">
      <div className="program-inner">
        <div className="program-heading">
          <h2>Popular Destinations</h2>
          <ul className="view-all">
            <li>
              <Link to="/program" className="ref">
                View all programs  →
              </Link>
            </li>
          </ul>
        </div>

        <div className="program-card">
          {Pfeatures.map((feature) => (
            <article key={feature.title} className="pcard card">
              <img src={feature.image} alt="" className="card-image" />
              <div className="card-body">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProgramCard;

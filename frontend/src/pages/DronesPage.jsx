
import React from "react";

// Imágenes de los 3 drones 
import dronAImg from "../recursos/dronA_beeworker.webp";
import dronBImg from "../recursos/dronB_honeypilot.webp";
import dronCImg from "../recursos/dronC_flowerscout.webp";

function DronesPage() {
  return (
    <section id="drones" className="bb-drones-page bb-section bb-section--light">
      {}
      <header className="bb-drones-header">
        <h1 className="bb-drones-title">Drones polinizadores BeeBloom</h1>
        <p className="bb-drones-intro">
          Estos son algunos de los modelos de dron que BeeBloom puede asignar a
          tus misiones de polinización. Cada uno se adapta a distintos tipos de
          cultivo y extensiones de parcela.
        </p>
      </header>

      {}
      <div className="bb-drones-grid">
        <article className="bb-drone-card">
          <div className="bb-drone-card__image-wrap">
            <img
              src={dronAImg}
              alt="Dron A BeeWorker sobrevolando un cultivo"
              className="bb-drone-card__image"
            />
          </div>
          <div className="bb-drone-card__body">
            <span className="bb-drone-card__tag">Dron BeeBloom</span>
            <h2 className="bb-drone-card__title">Dron A - BeeWorker</h2>
            <p className="bb-drone-card__text">
              Modelo robusto, pensado para parcelas medianas con ciclos de
              floración regulares.
            </p>
          </div>
        </article>

        <article className="bb-drone-card">
          <div className="bb-drone-card__image-wrap">
            <img
              src={dronBImg}
              alt="Dron B HoneyPilot pulverizando un cultivo"
              className="bb-drone-card__image"
            />
          </div>
          <div className="bb-drone-card__body">
            <span className="bb-drone-card__tag">Dron BeeBloom</span>
            <h2 className="bb-drone-card__title">Dron B - HoneyPilot</h2>
            <p className="bb-drone-card__text">
              Especialista en cultivos intensivos, optimiza recorridos para
              reducir tiempos de misión.
            </p>
          </div>
        </article>

        <article className="bb-drone-card">
          <div className="bb-drone-card__image-wrap">
            <img
              src={dronCImg}
              alt="Dron C FlowerScout inspeccionando el terreno"
              className="bb-drone-card__image"
            />
          </div>
          <div className="bb-drone-card__body">
            <span className="bb-drone-card__tag">Dron BeeBloom</span>
            <h2 className="bb-drone-card__title">Dron C - FlowerScout</h2>
            <p className="bb-drone-card__text">
              Ideal para parcelas irregulares y zonas con cambios de pendiente,
              con sensores extra de inspección.
            </p>
          </div>
        </article>
      </div>

      {}
      <section className="bb-section bb-section--light bb-drones-matching">
        <div className="bb-drones-matching__shell">
          <header className="bb-drones-matching__header">
            <span className="bb-drones-matching__eyebrow">
              Asignación inteligente de flota
            </span>
            <h2 className="bb-drones-matching__title">
              ¿Cómo asignamos un dron a tu misión?
            </h2>
            <p className="bb-drones-matching__intro">
              Cuando solicitas una misión desde la pestaña{" "}
              <strong>“Contratar misión”</strong>, el sistema selecciona el dron
              más adecuado teniendo en cuenta varios factores clave:
            </p>
          </header>

          <div className="bb-drones-matching__grid">
            <article className="bb-drones-matching__item">
              <div className="bb-drones-matching__badge">1</div>
              <h3 className="bb-drones-matching__item-title">
                Tamaño y geometría
              </h3>
              <p>
                Analizamos la <strong>superficie y forma de la parcela</strong>{" "}
                para elegir el dron con la autonomía y maniobrabilidad
                adecuadas.
              </p>
            </article>

            <article className="bb-drones-matching__item">
              <div className="bb-drones-matching__badge">2</div>
              <h3 className="bb-drones-matching__item-title">
                Tipo de cultivo
              </h3>
              <p>
                Se tiene en cuenta el <strong>tipo de cultivo</strong> y el
                <strong> momento de floración</strong> para ajustar altura y
                patrón de vuelo.
              </p>
            </article>

            <article className="bb-drones-matching__item">
              <div className="bb-drones-matching__badge">3</div>
              <h3 className="bb-drones-matching__item-title">
                Condiciones previstas
              </h3>
              <p>
                Consideramos las{" "}
                <strong>condiciones meteorológicas previstas</strong> para
                priorizar drones más estables con viento o cambios de
                temperatura.
              </p>
            </article>

            <article className="bb-drones-matching__item">
              <div className="bb-drones-matching__badge">4</div>
              <h3 className="bb-drones-matching__item-title">
                Disponibilidad de flota
              </h3>
              <p>
                Revisamos la <strong>disponibilidad en tu zona</strong> para
                garantizar que el dron pueda operar en la fecha que necesitas.
              </p>
            </article>
          </div>

          <p className="bb-drones-matching__foot">
            <strong>
              Tú solo indicas dónde está tu campo y cuándo necesitas la
              intervención.
            </strong>{" "} 
            BeeBloom se encarga del resto.
          </p>
        </div>
      </section>
    </section>
  );
}

export default DronesPage;
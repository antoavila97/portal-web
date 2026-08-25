import Reveal from './Reveal'

const parrafos = [
  'La fundación de Puerto Varador se atribuye a la desaparición de Puerto Manuel Julio, allá por el año 1968, cuando el caudaloso río Mamoré y la corriente voraz de las aguas turbulentas golpeaban los barrancos, llevándose los sembradíos de los habitantes y todo cuanto se atravesaba en su paso, e inclusive la comunidad de Puerto Manuel Julio, que desapareció completamente debido a que estaba asentada sobre la ribera del río Mamoré, a 14 kilómetros y medio de la ciudad de Trinidad, lugar donde YPFB había construido en 1964 una planta de almacenamiento y bombeo de combustible hasta Trinidad.',
  'En 1969, por la necesidad de acortar el camino, se inició la apertura de la brecha que bordeaba una parte del corte Toribio, que conducía al pueblo grande en tiempos de agua, y un año más tarde se asentaron las primeras familias.',
  'Puerto Varador se fundó el 14 de septiembre de 1970, gracias a su ubicación estratégica: era un estrecho de unos 100 metros donde los navegantes preferían arrastrar sus canoas con rodillos de palo para ahorrarse un día de viaje, en vez de dar la vuelta hasta el corte Toribio y llegar a Puerto Almacén.',
  'Las primeras personas en asentarse fueron dos comerciantes, el señor Alfredo y Yeko Zabala, quienes proveían alimentos y otros enseres. Tras la desaparición de Puerto Manuel Julio, empezaron a migrar el señor Felipe Mollinedo y, en distintos tiempos, la señora Marcela Tomichá, Trinidad Rodríguez, Idolina y Ladislao Hurtado, cada uno con su familia, en una migración escalonada debido a que debían cosechar lo que quedaba de sus productos agrícolas. Posteriormente llegó también la familia Aquimequedo, y así se fueron asentando otras familias con el paso del tiempo.',
  'El primer Capitán de Puerto fue el Sargento Germán Andia, encargado de colocar las cañerías para el bombeo de combustible desde la orilla del río Mamoré (Puerto Manuel Julio) hasta la ciudad de Trinidad.',
  'Así se fue poblando la comunidad, convirtiéndose en uno de los puertos más importantes, ya que las embarcaciones varaban ahí trayendo alimentos del interior del país, así como combustible transportado en turriles desde Puerto Villarroel, dando paso hacia el país fronterizo de Brasil y otros lugares del departamento. Esto generó ingresos económicos tanto para el departamento como para las familias dedicadas al comercio, y Puerto Varador se convirtió en el centro turístico de mayor relevancia de la ciudad, recibiendo visitantes del interior del país y del exterior.',
  'La escuelita también se trasladó desde Puerto Manuel Julio hasta la varada del Puerto con el nombre de Eduardo Abaroa, tres años después, cuando la mayoría de las familias de ganaderos —que tenían casas en Trinidad— se habían mudado a la ciudad capital. El primer profesor fue Santiago Mercado y la profesora Coralia Monasterio.',
  'Había 22 familias asentadas en la comunidad cuando, el 13 de agosto de 1978, un devastador incendio devoró todas las viviendas en solo 15 minutos. Fue un hecho que quedó marcado en la memoria de quienes sufrieron esa tragedia: las llamas voraces, acompañadas de fuerte viento, consumieron todo a su paso entre aterradoras explosiones. Gracias a Dios no hubo que lamentar vidas humanas.',
  'Actualmente, Puerto Varador se encuentra asentada a 14 km de la ciudad de la Santísima Trinidad, sobre la carretera a San Ignacio de Moxos, con una población de 396 familias y 2.626 habitantes, según el censo comunal de 2021, dedicadas a diferentes actividades económicas.',
]

export default function ResenaHistoricaSection() {
  return (
    <section className="bg-[#f7f3ea] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Reseña Histórica</h2>
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 space-y-5 text-gray-700 leading-relaxed text-justify">
            <p className="first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-1">
              {parrafos[0]}
            </p>
            {parrafos.slice(1, -1).map((texto) => (
              <p key={texto.slice(0, 24)}>{texto}</p>
            ))}
            <p className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 text-dark">
              {parrafos[parrafos.length - 1]}
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  )
}

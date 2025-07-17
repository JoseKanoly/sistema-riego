import {
  LightbulbIcon,
  HomeIcon,
  GaugeIcon,
  HistoryIcon,
  BookOpenIcon,
  ZapIcon,
  DropletIcon,
  ThermometerIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TutorialPage() {
  return (
    <div className="px-4 py-5">
      {" "}
      {/* Cambiado de 'container' a 'px-4' */}
      <h1 className="mb-6 text-3xl font-bold text-center flex items-center justify-center gap-2">
        <LightbulbIcon className="h-8 w-8 text-yellow-600" />
        Tutorial de Uso
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Bienvenido al tutorial de tu Sistema de Riego Inteligente. Aquí encontrarás una guía completa para aprovechar al
        máximo todas las funcionalidades de la aplicación.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {" "}
        {/* Eliminado 'max-w-6xl mx-auto' */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>1. Primeros Pasos y Conexión</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenido de texto largo se mantiene alineado a la izquierda para mejor legibilidad */}
            <p>
              Para que la aplicación funcione, tu dispositivo de riego debe estar conectado y enviando datos a Blynk
              utilizando el token proporcionado. Asegúrate de que tu hardware esté configurado correctamente para
              comenzar a monitorear.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Verifica que tu dispositivo esté encendido y conectado a internet.</li>
              <li>Asegúrate de que el token en tu código de hardware coincida con el de la aplicación.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>2. Navegación de la Aplicación</CardTitle>
          </CardHeader>
          <CardContent>
            <p>La aplicación está diseñada para ser intuitiva. Puedes navegar entre las secciones principales:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <HomeIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Inicio:</strong> La página de bienvenida.
              </li>
              <li>
                <GaugeIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Sistema:</strong> Tu dashboard de monitoreo en tiempo real.
              </li>
              <li>
                <HistoryIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Historial:</strong> Registros de eventos de riego pasados.
              </li>
              <li>
                <BookOpenIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Wiki:</strong> Una enciclopedia de plantas con información útil.
              </li>
              <li>
                <LightbulbIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Tutorial:</strong> Esta misma guía de uso.
              </li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              En móviles, encontrarás estos iconos en una barra de navegación fija en la parte inferior.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>3. Monitoreo en Tiempo Real (Sección Sistema)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>En la sección "Sistema", obtendrás datos en vivo de tus sensores:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <DropletIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Humedad del Suelo:</strong> Porcentaje actual y un gráfico que muestra su evolución. El color
                del gráfico cambia según el nivel de humedad (Rojo: muy seco, Naranja: necesita atención, Verde:
                óptimo).
              </li>
              <li>
                <ThermometerIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Temperatura:</strong> Temperatura ambiente actual. El color del valor cambia (Azul: frío, Verde:
                normal, Rojo: caliente).
              </li>
              <li>
                <DropletIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Humedad Ambiente:</strong> Porcentaje de humedad en el aire. El color del valor cambia (Naranja:
                seco, Verde: normal, Azul: húmedo).
              </li>
              <li>
                <ZapIcon className="inline-block h-4 w-4 mr-1" />
                <strong>Estado de la Bomba:</strong> Indica si la bomba de riego está ENCENDIDA o APAGADA.
                <p className="mt-1">
                  Utiliza el botón debajo del estado de la bomba para **ENCENDERLA o APAGARLA manualmente**.
                </p>
              </li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              Todos los datos se actualizan automáticamente cada 5 segundos.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>4. Historial de Riego</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              La sección "Historial" registra automáticamente un evento cada vez que la bomba de riego se **APAGA**.
              Esto te permite llevar un seguimiento de cuándo y bajo qué condiciones se realizó el riego.
            </p>
            <p className="mt-2">Cada registro incluye:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Fecha y Hora:</strong> El momento exacto en que la bomba se apagó.
              </li>
              <li>
                <strong>Humedad del Suelo (%):</strong> La lectura de humedad del suelo en ese instante.
              </li>
              <li>
                <strong>Temperatura del Suelo (°C):</strong> La temperatura del suelo registrada en ese momento.
              </li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              {"Nota: Este historial se guarda localmente en tu navegador (localStorage). Si borras los datos de tu"}
              {"navegador, el historial se perderá. Para una persistencia a largo plazo y acceso desde cualquier"}
              {"dispositivo, se requeriría una base de datos en el servidor."}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>5. Wiki de Plantas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explora la sección "Wiki" para acceder a una base de datos de plantas. Cada tarjeta de planta incluye una
              imagen y una breve descripción.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Haz clic en cualquier tarjeta de planta para abrir una ventana emergente con información más detallada
                sobre su descripción y cuidados específicos.
              </li>
              <li>Ideal para identificar nuevas plantas o recordar sus necesidades de riego y ambiente.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>6. Consejos para el Uso Óptimo</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Monitoreo Regular:</strong> Revisa el dashboard del sistema con frecuencia para asegurarte de
                que tus plantas reciban el cuidado adecuado.
              </li>
              <li>
                <strong>Calibración de Sensores:</strong> Si las lecturas parecen inconsistentes, considera calibrar tus
                sensores físicos.
              </li>
              <li>
                <strong>Explora la Wiki:</strong> Utiliza la Wiki de Plantas para aprender sobre las necesidades
                específicas de cada especie que cultivas.
              </li>
              <li>
                <strong>Ajusta el Riego Manualmente:</strong> Si observas que tus plantas necesitan más o menos agua de
                lo habitual, usa el botón de la bomba para un control inmediato.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

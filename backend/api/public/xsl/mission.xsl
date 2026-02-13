<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:m="https://beebloom.local/schema/mission"
  exclude-result-prefixes="m">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/m:Mission">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Recibo misión #<xsl:value-of select="m:Id"/></title>

        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #f4f4f0;
            padding: 2rem;
            color: #222;
          }

          .bb-receipt {
            max-width: 720px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 18px 45px rgba(0,0,0,0.12);
            padding: 1.8rem 2rem 2.1rem;
            position: relative;
          }

          /* BOTÓN IMPRIMIR */
          .bb-print-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #DB560E;
            color: white;
            padding: 0.45rem 1.2rem;
            border-radius: 999px;
            border: none;
            font-size: 0.9rem;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          }

          .bb-print-btn:hover {
            background: #c24d0d;
          }

          @media print {
            .bb-print-btn {
              display: none;
            }
          }

          /* CABECERA SIN ICONO */
          .bb-receipt-header {
            margin-bottom: 1.8rem;
          }

          .bb-brand-title {
            font-size: 2rem;
            font-weight: 800;
            margin: 0;
            letter-spacing: 0.02em;
            color: #000;
          }

          .bb-brand-sub {
            margin-top: -3px;
            font-size: 0.9rem;
            color: #777;
          }

          h1 {
            margin-top: 1rem;
            font-size: 1.6rem;
            color: #DB560E;
          }

          .bb-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.4rem;
          }

          .bb-label { font-weight: 600; }
          .bb-tag {
            background: rgba(219,86,14,0.08);
            color: #DB560E;
            padding: 0.15rem 0.6rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
          }

          h2 {
            margin-top: 1.4rem;
            margin-bottom: 0.6rem;
            color: #555;
            font-size: 1.1rem;
          }

          .bb-footer {
            margin-top: 1.6rem;
            font-size: 0.85rem;
            text-align: center;
            color: #777;
          }
        </style>
      </head>

      <body>
        <div class="bb-receipt">

          <!-- BOTÓN IMPRIMIR -->
          <button class="bb-print-btn" onclick="window.print()">Imprimir</button>

          <!-- CABECERA LIMPIA -->
          <div class="bb-receipt-header">
            <div class="bb-brand-title">BeeBloom</div>
            <div class="bb-brand-sub">Recibo oficial de misión · Proyecto DAW</div>
          </div>

          <!-- TITULO PRINCIPAL -->
          <h1>Recibo de misión #<xsl:value-of select="m:Id"/></h1>

          <!-- ESTADO Y PRECIO -->
          <div class="bb-row">
            <div>
              <span class="bb-label">Estado:</span>
              <span class="bb-tag">
                <xsl:value-of select="m:Estado"/>
              </span>
            </div>
            <div>
              <span class="bb-label">Precio:</span>
              <xsl:text> </xsl:text>
              <xsl:value-of select="m:Precio"/> €
            </div>
          </div>

          <!-- DETALLE DE LA MISIÓN -->
          <h2>Detalle de la misión</h2>
          <p><span class="bb-label">Título:</span> <xsl:value-of select="m:Titulo"/></p>

          <h2>Fechas</h2>
          <p><span class="bb-label">Inicio:</span> <xsl:value-of select="m:Fechas/m:Inicio"/></p>
          <p><span class="bb-label">Fin:</span> <xsl:value-of select="m:Fechas/m:Fin"/></p>

          <h2>Pago</h2>
          <p><span class="bb-label">Estado del pago:</span> <xsl:value-of select="m:Pago/m:Estado"/></p>
          <p><span class="bb-label">Método:</span> <xsl:value-of select="m:Pago/m:Metodo"/></p>
          <p><span class="bb-label">Fecha de pago:</span> <xsl:value-of select="m:Pago/m:Fecha"/></p>

          <h2>Dron asignado</h2>
          <p><span class="bb-label">Nombre:</span> <xsl:value-of select="m:Dron/m:Nombre"/></p>
          <p><span class="bb-label">Serial:</span> <xsl:value-of select="m:Dron/m:Serial"/></p>

          <h2>Parcela</h2>
          <p><span class="bb-label">Nombre parcela:</span> <xsl:value-of select="m:Parcela/m:Nombre"/></p>
          <p><span class="bb-label">Estado parcela:</span> <xsl:value-of select="m:Parcela/m:Estado"/></p>

          <xsl:if test="normalize-space(m:Notas) != ''">
            <h2>Notas</h2>
            <p><xsl:value-of select="m:Notas"/></p>
          </xsl:if>

          <div class="bb-footer">
            Recibo generado automáticamente por BeeBloom. Puedes imprimir esta página para archivarla.
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
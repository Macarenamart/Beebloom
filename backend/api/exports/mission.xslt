<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:m="https://beebloom.local/schema/mission">
  <xsl:output method="html" encoding="UTF-8" />

  <xsl:template match="/m:Mission">
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Recibo misión #<xsl:value-of select="m:Id"/></title>
        <style>
          body{font-family:system-ui,Arial;margin:24px}
          h1{margin:0 0 12px 0}
          .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .card{padding:12px;border:1px solid #ddd;border-radius:10px}
          .muted{color:#666}
          table{width:100%;border-collapse:collapse}
          td,th{padding:6px;border-bottom:1px solid #eee;text-align:left}
        </style>
      </head>
      <body>
        <h1>Recibo de misión #<xsl:value-of select="m:Id"/></h1>
        <p class="muted"><xsl:value-of select="m:Titulo"/></p>

        <div class="grid">
          <div class="card">
            <h3>Estado</h3>
            <p><b>Misión:</b> <xsl:value-of select="m:Estado"/></p>
            <p><b>Pago:</b> <xsl:value-of select="m:Pago/m:Estado"/></p>
            <p><b>Método:</b> <xsl:value-of select="m:Pago/m:Metodo"/></p>
            <p><b>Fecha pago:</b> <xsl:value-of select="m:Pago/m:Fecha"/></p>
          </div>
          <div class="card">
            <h3>Importe</h3>
            <p><b>Precio:</b> <xsl:value-of select="m:Precio"/> €</p>
          </div>
        </div>

        <div class="grid" style="margin-top:12px">
          <div class="card">
            <h3>Fechas</h3>
            <p><b>Inicio:</b> <xsl:value-of select="m:Fechas/m:Inicio"/></p>
            <p><b>Fin:</b> <xsl:value-of select="m:Fechas/m:Fin"/></p>
          </div>
          <div class="card">
            <h3>Dron</h3>
            <p><b>Nombre:</b> <xsl:value-of select="m:Dron/m:Nombre"/></p>
            <p><b>Serial:</b> <xsl:value-of select="m:Dron/m:Serial"/></p>
            <p><b>Estado:</b> <xsl:value-of select="m:Dron/m:Estado"/></p>
          </div>
        </div>

        <div class="card" style="margin-top:12px">
          <h3>Parcela</h3>
          <p><b>Nombre:</b> <xsl:value-of select="m:Parcela/m:Nombre"/></p>
          <p><b>Estado:</b> <xsl:value-of select="m:Parcela/m:Estado"/></p>
        </div>

        <div class="card" style="margin-top:12px">
          <h3>Notas</h3>
          <p><xsl:value-of select="m:Notas"/></p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
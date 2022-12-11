import * as d3 from "d3";
import { transition } from "d3";

export const COLOR_SCHEME = [
  "#9EDFE4",
  "#75D3DD",
  "#71C2DE",
  "#78ACE6",
  "#7C99ED",
  "#7E84F4",
  "#7E6CFA",
];
export async function HexaChoropleth(foreign_born_data_state) {
  const svg = d3.select("svg#map-graph").attr("width", 500).attr("height", 300);

  // Map and projection
  const projection = d3
    .geoMercator()
    .scale(400) // This is the zoom
    .translate([970, 470]); // You have to play with these values to center your map

  // Path generator
  const path = d3.geoPath().projection(projection);

  // Load external data and boot
  const data = await d3.json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json"
  );

  // Draw the map
  svg
    .append("g")
    .selectAll("path")
    .data(data.features)
    .join("path")
    .attr("d", path)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", (d) => {
      const stateName = d.properties.google_name.slice(0, -16);
      const p = foreign_born_data_state[stateName];
      return d3.scaleQuantize(
        [0, 20],
        COLOR_SCHEME
      )(p["Population Percentage"]);
    })

  // Add the labels
  svg
    .append("g")
    .selectAll("labels")
    .data(data.features)
    .join("text")
    .attr("x", function (d) {
      return path.centroid(d)[0];
    })
    .attr("y", function (d) {
      return path.centroid(d)[1];
    })
    .text(function (d) {
      return d.properties.iso3166_2;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .attr("pointer-events", "none")
    .style("font-size", 11)
    .style("font-family", "Space Mono")
    .style("fill", "black");

}

export async function HexaChoroplethInit(foreign_born_data_state) {
  const svg = d3.select("svg#map-graph-init").attr("width", 500).attr("height", 300);

  // Map and projection
  const projection = d3
    .geoMercator()
    .scale(400) // This is the zoom
    .translate([970, 470]); // You have to play with these values to center your map

  // Path generator
  const path = d3.geoPath().projection(projection);

  // Load external data and boot
  const data = await d3.json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json"
  );

  svg
    .attr("opacity",0);

  // Draw the map
  svg
    .append("g")
    .selectAll("path")
    .data(data.features)
    .join("path")
    .attr("fill", (d) => {
      const stateName = d.properties.google_name.slice(0, -16);
      const p = foreign_born_data_state[stateName];
      return d3.scaleQuantize(
        [0, 20],
        COLOR_SCHEME
      )(p["Population Percentage"]);
    })
    .attr("d", path)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .append("title")
    .text((d, i) => {
      const stateName = d.properties.google_name.slice(0, -16);
      const p = foreign_born_data_state[stateName];
      return `State: ${p.State}
Foreign Born Population: ${p.Population}
Share: ${p["Population Percentage"]}%`;
    })

  // Add the labels
  svg
    .append("g")
    .selectAll("labels")
    .data(data.features)
    .join("text")
    .attr("x", function (d) {
      return path.centroid(d)[0];
    })
    .attr("y", function (d) {
      return path.centroid(d)[1];
    })
    .text(function (d) {
      return d.properties.iso3166_2;
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .attr("pointer-events", "none")
    .style("font-size", 11)
    .style("font-family", "Space Mono")
    .style("fill", "black");

  svg
    .transition()
    .duration(1000)
    .attr("opacity",1);
}

export function Legend(
  color,
  {
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = 3,
    tickFormat,
    tickValues,
  } = {}
) {
  console.log(ticks);
  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3
    .select("svg#map-legend")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .style("display", "block");

  let tickAdjust = (g) =>
    g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color
      .copy()
      .rangeRound(
        d3.quantize(d3.interpolate(marginLeft, width - marginRight), n)
      );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr(
        "xlink:href",
        ramp(
          color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
        ).toDataURL()
      );
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(
      color
        .copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      {
        range() {
          return [marginLeft, width - marginRight];
        },
      }
    );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      console.log(ticks);
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3
          .range(n)
          .map((i) => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    console.log(color.range());
    const thresholds = color.thresholds
      ? color.thresholds() // scaleQuantize
      : color.quantiles
      ? color.quantiles() // scaleQuantile
      : color.domain(); // scaleThreshold

    const thresholdFormat =
      tickFormat === undefined
        ? (d) => d
        : typeof tickFormat === "string"
        ? d3.format(tickFormat)
        : tickFormat;

    x = d3
      .scaleLinear()
      .domain([-1, color.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

    svg
      .append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
      .attr("x", (d, i) => x(i - 1))
      .attr("y", marginTop)
      .attr("width", (d, i) => x(i) - x(i - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", (d) => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = (i) => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3
      .scaleBand()
      .domain(color.domain())
      .rangeRound([marginLeft, width - marginRight]);

    svg
      .append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
      .attr("x", x)
      .attr("y", marginTop)
      .attr("width", Math.max(0, x.bandwidth() - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", color);

    tickAdjust = () => {};
  }

  // .filter((c, i) => i % 3 == 0)
  console.log(ticks);
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues)
    )
    .call(tickAdjust)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title)
    );

  return svg.node();
}

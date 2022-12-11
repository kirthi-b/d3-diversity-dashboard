<template>
  <svg id="language-chart"></svg>
</template>

<script setup lang="ts">
import { COLOR_SCHEME } from "@/utils/chart-helpter";
import * as d3 from "d3";
import { onMounted, ref, watch } from "vue";
const margin = { top: 16, right: 6, bottom: 6, left: 0 };
const n = 10;
const barSize = 30;
const height = margin.top + barSize * n + margin.bottom;
const width = 550;
const duration = 125;
const language_data = ref(false);
const keyframes = [];
let updateGraph;

async function setupGraph(initYear) {
  const language_data_d = d3.group(language_data.value, (d) => d.Year);
  const names = new Set(language_data.value.map((d) => d.Language));
  const datevalues = Array.from(
    d3.rollup(
      language_data.value,
      ([d]) => d.Population,
      (d) => +d.Year,
      (d) => d.Language
    )
  )
    .map(([date, data]) => [date, data])
    .sort(([a], [b]) => d3.ascending(a, b));

  function rank(value) {
    const data = Array.from(names, (name) => ({ name, value: value(name) }));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
  }
  const k = 10;
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        ka * (1 - t) + kb * t,
        rank((name) => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t),
      ]);
    }
  }
  keyframes.push([kb, rank((name) => b.get(name) || 0)]);

  const nameframes = d3.groups(
    keyframes.flatMap(([, data]) => data),
    (d) => d.name
  );
  const prev = new Map(
    nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a]))
  );
  const next = new Map(nameframes.flatMap(([, data]) => d3.pairs(data)));

  const max_pop = d3.max(language_data.value, (d) => d.Population);

  const x = d3.scaleLinear([0, max_pop], [margin.left, width - margin.right]);
  const y = d3
    .scaleBand()
    .domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1);
  const colorScale = d3.scaleOrdinal(COLOR_SCHEME).domain(d3.range(n + 1));

  function bars(svg) {
    let bar = svg.append("g").attr("fill-opacity", 0.6).selectAll("rect");
    return ([date, data], transition) =>
      (bar = bar
        .data(data.slice(0, n), (d) => d.name)
        .join(
          (enter) =>
            enter
              .append("rect")
              .attr("fill", (d, i) => colorScale(i))
              .attr("height", y.bandwidth())
              .attr("x", x(0))
              .attr("y", (d) => y((prev.get(d) || d).rank))
              .attr("width", (d) => x((prev.get(d) || d).value) - x(0)),
          (update) => update,
          (exit) =>
            exit
              .transition(transition)
              .remove()
              .attr("y", (d) => y((next.get(d) || d).rank))
              .attr("width", (d) => x((next.get(d) || d).value) - x(0))
        )
        .call((bar) =>
          bar
            .transition(transition)
            .attr("y", (d) => y(d.rank))
            .attr("width", (d) => x(d.value) - x(0))
        ));
  }
  const formatNumber = d3.format(",d");
  function textTween(a, b) {
    const i = d3.interpolateNumber(a, b);
    return function (t) {
      this.textContent = formatNumber(i(t));
    };
  }
  function labels(svg) {
    let label = svg
      .append("g")
      .style("font", "bold  var(--sans-serif)")
      .style("font-size", "9px")
      .style("font-family", "Space Mono")
      .attr("text-anchor", "end")
      .selectAll("text");

    return ([date, data], transition) =>
      (label = label
        .data(data.slice(0, n), (d) => d.name)
        .join(
          (enter) =>
            enter
              .append("text")
              .attr(
                "transform",
                (d) =>
                  `translate(${x((prev.get(d) || d).value)},${y(
                    (prev.get(d) || d).rank
                  )})`
              )
              .attr("y", y.bandwidth() / 2)
              .attr("x", -6)
              .attr("dy", "-0.25em")
              .text((d) => d.name)
              .call((text) =>
                text
                  .append("tspan")
                  .attr("fill-opacity", 0.7)
                  .attr("font-weight", "normal")
                  .attr("x", -6)
                  .attr("dy", "1.15em")
              ),
          (update) => update,
          (exit) =>
            exit
              .transition(transition)
              .remove()
              .attr(
                "transform",
                (d) =>
                  `translate(${x((next.get(d) || d).value)},${y(
                    (next.get(d) || d).rank
                  )})`
              )
              .call((g) =>
                g
                  .select("tspan")
                  .tween("text", (d) =>
                    textTween(d.value, (next.get(d) || d).value)
                  )
              )
        )
        .call((bar) =>
          bar
            .transition(transition)
            .attr("transform", (d) => `translate(${x(d.value)},${y(d.rank)})`)
            .call((g) =>
              g
                .select("tspan")
                .tween("text", (d) =>
                  textTween((prev.get(d) || d).value, d.value)
                )
            )
        ));
  }
  function axis(svg) {
    const g = svg.append("g").attr("transform", `translate(0,${margin.top})`);

    const axis = d3
      .axisTop(x)
      .ticks(width / 160)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (n + y.padding()));

    return (_, transition) => {
      g.transition(transition).call(axis);
      g.select(".tick:first-of-type ").remove();
      g.selectAll(".tick line").attr("stroke", "white");
      g.select(".domain").remove();
    };
  }

  const tickerFormat = (v) => {
    const a = Math.round(v / 10) * 10;
    return a == 2020 ? 2018 : a;
  };
  function ticker(svg) {
    const now = svg
      .append("text")
      .style("font", `bold ${barSize}px var(--sans-serif)`)
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .attr("x", width - 6)
      .attr("y", margin.top + barSize * (n - 0.45))
      .attr("dy", "0.32em")
      .text(tickerFormat(keyframes[0][0]));

    return ([date], transition) => {
      transition.end().then(() => now.text(tickerFormat(date)));
    };
  }
  const svg = d3
    .select("svg#language-chart")
    .attr("viewBox", [0, 0, width, height]);

  const updateBars = bars(svg);
  const updateAxis = axis(svg);
  const updateLabels = labels(svg);
  const updateTicker = ticker(svg);

  // yield svg.node();

  // Extract the top bar’s value.
  const updateGraph = async (startYear, endYear) => {
    if (startYear == endYear) return;
    let i = startYear;
    while (i != endYear) {
      const keyframe = keyframes[i - 1980];
      const transition = svg
        .transition()
        .duration(duration)
        .ease(d3.easeLinear);
      x.domain([0, keyframe[1][0].value]);

      updateBars(keyframe, transition);
      updateAxis(keyframe, transition);
      updateLabels(keyframe, transition);
      updateTicker(keyframe, transition);

      await transition.end();
      if (endYear > startYear) i++;
      else i--;
    }
  };
  return updateGraph;
  // for (const keyframe of keyframes) {
  //   const transition = svg.transition().duration(duration).ease(d3.easeLinear);

  //   // Extract the top bar’s value.
  //   x.domain([0, keyframe[1][0].value]);

  //   updateBars(keyframe, transition);
  //   updateAxis(keyframe, transition);
  //   updateLabels(keyframe, transition);
  //   updateTicker(keyframe, transition);

  //   // invalidation.then(() => svg.interrupt());
  //   await transition.end();
  // }
}
const props = defineProps({ year: Number });
watch(
  () => props.year,
  async (newYear, oldYear) => {
    await updateGraph(oldYear, newYear);
  }
);
onMounted(async () => {
  language_data.value = (
    await d3.csv(
      "https://raw.githubusercontent.com/kirthi-b/d3-understanding-immigrants/main/Data/Languages%20Spoken.csv"
    )
  ).map((d) => {
    return {
      ...d,
      Year: d.Year == "2018" ? 2020 : parseInt(d.Year),
      // Year: parseInt(d.Year),
      Population: parseInt(d.Population),
    };
  });
  updateGraph = await setupGraph(1980, props.year);
  await updateGraph(1980, props.year + 1);
  // const svg = d3
  //   .select("svg#language-chart")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .selectAll("rect")
  //   .data(language_data_d.get("1980"))
  //   .enter()
  //   .append("rect")
  //   .attr("fill", (d, i) => colorScale(i))
  //   .attr("x", x(0))
  //   .attr("y", (d, i) => y(i))
  //   .attr("width", (d) => x(d.Population))
  //   .attr("height", y.bandwidth());
});
</script>

<style scoped></style>

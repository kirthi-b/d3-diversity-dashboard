<style lang="scss">
/* Set the theme color of the component */
$themeColor: #7e6cfa;
@import "vue-slider-component/lib/theme/antd.scss";
</style>

<script lang="ts">

import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'Chart',
  components: {
    apexchart: VueApexCharts,
  },
  data: function() {
    return {
          series: { [1980] : [7095720,6983740], [1990] : [7962082,11719922], [2000] : [12533932,18599549], [2010] : [17456312,22460563], [2018] : [22679525,22081097] },
          chartOptions: {
            colors:['#B2A7FD', '#AFE5EA'],
            chart: {
              width: 380,
              type: 'donut',
            },
            plotOptions: {
              pie: {
                customScale: 1.05,
                donut: {
                  size: '75%',
                  labels: {
                    show: true,
                    total: {
                      show: true
                    },
                    value: {
                      fontFamily: 'Space Mono',
                    }
                    }
        }
              }
            },
            labels: ['Citizen', 'Non-Citizen'],
            dataLabels: {
              enabled: true,
              dropShadow: {enabled: false},
              style: {
                fontSize: '9px',
                fontFamily: 'Space Mono',
                colors: ['#000']
             },
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                  show: false
                }
              }
            }],
            legend: {
              position: 'right',
              offsetY: 0,
              height: 250,
              fontFamily: 'Space Mono',
            },
          },
          Eduseries: { [1980] : [{
            name: 'Less than High School Graduate',
            data: [1053140,361640,8340,22040,14020,2236340,272660,410200,108340,124740,88160,17440]
          }, {
            name: 'High School Graduate',
            data: [152520,250400,5760,18240,17040,1197540,207800,247120,58980,107340,60060,13560]
          }, {
            name: 'Two Year Degree/Some College',
            data: [92900,236220,2680,28360,12260,565800,137880,145780,41680,85480,62040,25120]
          }, {
            name: "Bachelor's Degree",
            data: [16980,210780,1360,30080,5620,262440,48920,56240,11820,27000,36220,11200]
          }, {
            name: 'Advanced Degree',
            data: [22960,208860,1280,92660,7220,307140,53040,65740,12020,43780,63700,20560]
          }], 
                       [1990] : [{
            name: 'Less than High School Graduate',
            data: [2110819,732776,null,63628,19311,1444266,185495,672606,409024,232499,116752,24625]
          }, {
            name: 'High School Graduate',
            data: [324386,493896,null,54214,19792,991869,169818,347381,143680,204386,100439,28644]
          }, {
            name: 'Two Year Degree/Some College',
            data: [260871,601655,null,65175,22267,788403,173845,335150,134670,207501,114199,57834]
          }, {
            name: "Bachelor's Degree",
            data: [57340,635022,null,121828,10276,368745,85078,128029,40017,90820,119731,49138]
          }, {
            name: 'Advanced Degree',
            data: [38787,336969,null,162939,8645,369084,62588,85885,22417,65505,105239,44463]
          }], 
                       [2000] : [{
            name: 'Less than High School Graduate',
            data: [4467999,1099735,3017,156147,25800,1015773,126017,941189,843125,388203,154925,75627]
          }, {
            name: 'High School Graduate',
            data: [997462,803836,5008,119285,33523,1078655,147709,577299,295592,378805,149880,98068]
          }, {
            name: 'Two Year Degree/Some College',
            data: [621428,1024379,4953,141204,34834,976990,205329,555050,247408,384102,175527,146470]
          }, {
            name: "Bachelor's Degree",
            data: [165402,1203125,6464,337505,22000,641664,137591,232644,81237,200044,202005,119402]
          }, {
            name: 'Advanced Degree',
            data: [103320,653583,5024,383919,15672,635172,103502,155948,45487,150980,164893,96173]
          }], 
                       [2010] : [{
            name: 'Less than High School Graduate',
            data: [5704512,1178982,6689,204964,13727,654786,70328,862958,1241528,410392,170930,125459]
          }, {
            name: 'High School Graduate',
            data: [2193090,1185874,12865,204981,31199,1094132,138036,979509,619380,649731,223213,208545]
          }, {
            name: 'Two Year Degree/Some College',
            data: [1104385,1335417,14066,239160,37500,1014417,191121,795677,417379,607593,233502,302284]
          }, {
            name: "Bachelor's Degree",
            data: [372528,1782339,17105,660762,27969,813642,165646,391433,158990,412878,311251,232313]
          }, {
            name: 'Advanced Degree',
            data: [133592,1008127,12141,741065,20908,784783,128482,209956,65790,233552,242070,157482]
          }], 
                       [2018] : [{
            name: 'Less than High School Graduate',
            data: [5376496,1233513,5102,308494,26720,488729,52610,882438,1399431,403569,185300,201194]
          }, {
            name: 'High School Graduate',
            data: [2619905,1341724,16565,287480,51353,957705,124331,1173233,780777,773149,285768,330351]
          }, {
            name: 'Two Year Degree/Some College',
            data: [1327496,1507372,22521,320697,53714,1003116,196924,987259,503784,729619,289606,432143]
          }, {
            name: "Bachelor's Degree",
            data: [524225,2117941,32253,1003877,48792,967403,207485,562591,234528,610168,418472,378827]
          }, {
            name: 'Advanced Degree',
            data: [194147,1414465,25411,1245365,28727,994478,163790,314062,89029,377705,342688,272735]
          }]
                     },
          EduOptions: {
            colors:[
                    "#9EDFE4",
                    "#75D3DD",
                    "#71C2DE",
                    "#78ACE6",
                    "#7C99ED",
                    "#7E84F4",
                    "#7E6CFA",
                  ],
            chart: {
              type: 'bar',
              height: 400,
              stacked: true,
              stackType: '100%',
              toolbar: {show: false}
            },
            plotOptions: {
              bar: {
                horizontal: false,
                dataLabels: {
                  total: {
                    enabled: false
                  }
                }
              },
            },
            xaxis: {
              categories: ['Mexico',['East &','Southeast Asia'],'Central Asia','South Asia','Oceania','Europe',['Canada & Other','North America'],'Caribbean','Central America','South America',['Middle East','-North Africa'],'Sub-Saharan Africa'],
              labels: {style: { 
                fontFamily: 'Inter',
                fontSize: '9px',
              }
            }
            },
            yaxis: {
              title: {
                text: undefined
              },
              labels: {
                style: { 
                  fontFamily: 'Inter',
                  fontSize: '9px',
                }
              }
            },
            dataLabels: {
              enabled: true,
              dropShadow: {enabled: false},
              style: {
                fontSize: '8px',
                fontFamily: 'Space Mono',
                colors: ['#000']
             },
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 300
                },
                legend: {
                  show: false
                }
              }
            }],
            legend: {
              position: 'top',
              horizontalAlign: 'center',
              offsetX: 0,
              fontSize: '10px',
              fontFamily: 'Space Mono',
              showForZeroSeries: false,
              markers: {
                width: 10,
                height: 10
              }
            },
          },
          Homeseries: { 
          [1980] : [{
            name: "Home Ownership % (1980)",
            data: [40.9,48.1,58.3,50.4,49.2,63.6,66.6,37.6,28.1,36.8,42.4,32.1]
          }],
          [1990] : [{
            name: "Home Ownership % (1990)",
            data: [38.6,49.6,39.05,52.3,51.2,66.2,67.5,39.9,22.7,37,48.6,27.3]
          }],
          [2000] : [{
            name: "Home Ownership % (2000)",
            data: [43.7,53.1,19.8,45.1,51.9,63.2,68.9,44.7,32.7,43.5,52,33.6]
          }],
          [2010] : [{
            name: "Home Ownership % (2010)",
            data: [46.1,59.1,38,54.8,56.4,66.9,72.2,47.7,38.4,48.9,52.7,38.2]
          }],
          [2018] : [{
            name: "Home Ownership % (2018)",
            data: [49.3,62.1,40.2,54.2,53.3,66.5,71,45.5,37.6,49.4,51,36.3]
          }]
         },
          HomeOptions: {
            legend: {
              show: false},
              grid: {
                show: false},
            chart: {
              height: 350,
              type: 'bar',
              toolbar: {show: false},
              zoom: {
                enabled: false
              },
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: false
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 550
                }
            }
            },
            plotOptions: {
              bar: {
                horizontal: true,
                distributed: true,
                barHeight: '60%',
                dataLabels: {
                  position: 'bottom',
                }
              }
            },
            colors: [
                    "#9EDFE4",
                    "#75D3DD",
                    "#71C2DE",
                    "#78ACE6",
                    "#7C99ED",
                  ],
              xaxis: {
              categories: ['Mexico',['East &','Southeast Asia'],'Central Asia','South Asia','Oceania','Europe',['Canada & Other','North America'],'Caribbean','Central America','South America',['Middle East','-North Africa'],'Sub-Saharan Africa'],
              labels: {show: false,}
            },
            yaxis: {
              labels: {
                style: { 
                  fontFamily: 'Inter',
                  fontSize: '10px',
                }
              }
            },
            dataLabels: {
              formatter: function (val) {
                return val+"%"},
              offsetX: 7,
              offsetY: 1,
              enabled: true,
              dropShadow: {enabled: false},
              style: {
                fontSize: '8px',
                fontFamily: 'Space Mono',
                colors: ['#000']
              },
            },
          } 
        };
      },
};

</script>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref, reactive } from "vue";
import VueSlider from "vue-slider-component";

// import { sliderBottom } from "d3-simple-slider";
import {
  Legend,
  HexaChoropleth,
  HexaChoroplethInit,
  COLOR_SCHEME,
} from "../utils/chart-helpter";
import Accordion from "./Accordion.vue";
import LanguageChart from "./LanguageChart.vue";

const LanguageChartAccordion = ref(true);
const CitizenshipChartAccordion = ref(false);
const EducationChartAccordion = ref(false);
const HomeownershipChartAccordion = ref(false);
const year = ref(1980);
var startButton = 'Start'
const options = {
  data: [1980, 1990, 2000, 2010, 2018],
  dotSize: 14,
  width: 300,
  height: 4,
  contained: false,
  direction: "ltr",
  dataLabel: "label",
  dataValue: "value",
  min: 0,
  max: 100,
  interval: 1,
  disabled: false,
  clickable: true,
  duration: 0.5,
  adsorb: false,
  lazy: false,
  tooltip: "active",
  tooltipPlacement: "top",
  tooltipFormatter: void 0,
  useKeyboard: false,
  keydownHook: null,
  dragOnClick: false,
  enableCross: true,
  fixed: false,
  minRange: void 0,
  maxRange: void 0,
  order: true,
  marks: true,
  dotOptions: void 0,
  dotAttrs: void 0,
  process: true,
  dotStyle: void 0,
  railStyle: void 0,
  processStyle: void 0,
  tooltipStyle: void 0,
  stepStyle: void 0,
  stepActiveStyle: void 0,
  labelStyle: void 0,
  labelActiveStyle: void 0,
};
var playani = ref(false);
const accordions = [
  LanguageChartAccordion,
  CitizenshipChartAccordion,
  EducationChartAccordion,
  HomeownershipChartAccordion,
];

var tm: number;
const foreign_born_d = {};

onMounted(async () => {
  console.log("Mounted");

  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/choropleth

  const foreign_born = await d3.csv(
    "https://raw.githubusercontent.com/kirthi-b/d3-understanding-immigrants/main/Data/Foreign%20Born%20Population.csv"
  );

  const min_year = 1980;
  for (const r of foreign_born) {
    if (r.Year) {
      if (!(r.Year in foreign_born_d)) {
        foreign_born_d[r.Year] = {};
      }
      foreign_born_d[r.Year][r.State] = { ...r };
    }
  }

  // Step
  // const sliderStep = sliderBottom()
  //   .min(min_year)
  //   .max(2020)
  //   .width(400)
  //   .ticks(5)
  //   .step(10)
  //   .tickFormat((d: number) => (d == 2020 ? "2018" : d3.format(".4")(d)))
  //   .default(year.value)
  //   .on("onchange", (val: number) => {
  //     console.log(val);
  //     year.value = val == 2020 ? 2018 : val;
  //     HexaChoroplethInit(foreign_born_d[year.value]);
  //     setTimeout(() => {
  //       HexaChoropleth(foreign_born_d[year.value]);
  //     }, 1000);
  //   });

//   var gStep = d3
//     .select("div#time-slider")
//     .append("svg")
//     .attr("width", 500)
//     .attr("height", 80)
//     .append("g")
//     .attr("transform", "translate(30,30)");

//   gStep.call(sliderStep);

  Legend(d3.scaleQuantize([0, 20], COLOR_SCHEME), {
    tickFormat: (d) => `${Math.round(d)}%`,
    width: 200,
    ticks: 3,
  });
  HexaChoropleth(foreign_born_d[1980]);
  HexaChoroplethInit(foreign_born_d[1980]);
 });

function updateSlider(num: number) {
  num = num + 10;
  return num;
}

function accordionChange(i) {
  for (const a of accordions) {
    a.value = false;
  }
  console.log(accordions);
  accordions[i].value = true;
};

function sliderUpdated(val, index) {
  console.log(val);
    year.value = val;
    startButton = 'Start';
    if (val >= 2018) startButton = 'Reset';
  HexaChoroplethInit(foreign_born_d[year.value]);
  setTimeout(() => {
    HexaChoropleth(foreign_born_d[year.value]);
  }, 1000);
};

async function playSlider() {
  const foreign_born = await d3.csv(
    "https://raw.githubusercontent.com/kirthi-b/d3-understanding-immigrants/main/Data/Foreign%20Born%20Population.csv"
  );

  const foreign_born_d = {};
  for (const r of foreign_born) {
    if (r.Year) {
      if (!(r.Year in foreign_born_d)) {
        foreign_born_d[r.Year] = {};
      }
      foreign_born_d[r.Year][r.State] = { ...r };
    }
  }
  let val = year.value;

    if (val < 2018) {
      val = updateSlider(val);
      if (val >= 2018) {val = 2018; playani.value=false; startButton = 'Reset'};
      year.value = val;
      HexaChoroplethInit(foreign_born_d[val]);
      setTimeout(() => {
        HexaChoropleth(foreign_born_d[val]);
      }, 1000);
    
  } }

function startSlider() {
  if ((playani.value) && (year.value >= 2018)) {
    year.value = 1980;
    playani.value = false;
    clearInterval(tm);
    startButton = 'Start';
    HexaChoroplethInit(foreign_born_d[1980]);
    setTimeout(() => {
      HexaChoropleth(foreign_born_d[1980]);
    }, 1000);
  };
    if ((playani.value) && (year.value < 2018)) {
    playSlider();
    tm = setInterval(startSlider, 2500)};
  
  if (!playani.value) {
    clearInterval(tm);
  };
}


function stopSlider() {
  playani.value = false;
  clearInterval(tm);
}
</script>

<template>

  <div class="flex p-10">
    <div class="m-5 flex flex-col gap-4">
      <p class="text-[46px] mx-auto font-sans">
        <b>Diversity in the United States</b>
      </p>
      <p
        class="mx-auto font-mono px-10 pb-5 justify-center text-center text-[20px]"
      >
        Exploring Demographic Changes Through the Decades
      </p>

      <div class="flex">        
        <div>
             <div class="flex gap-5">
            <div class="static">
              <div class="font-bold text-center pb-0">
                % of Foreign-Born Population
              </div>
              <br>
              <p class="font-mono pb-5 text-size-[10px] text-[#aaa] text-center">
            (hover over a state for more info)</p>

              <svg id="map-legend" class="relative -top-5 left-37"></svg>
              <svg id="map-graph" class="absolute"></svg>
              <svg id="map-graph-init" class="relative" />

          </div>
        </div>
        </div>
        
          <div class="relative px-5">
          <div :style="{opacity: accordions[0].value ? '1' : '0'}" class="absolute font-sans text-[13px] leading-relaxed transition-all duration-500 opacity-100">
            <b class="text-[#7e6cfa] font-mono text-size-[20px]">Languages Spoken at Home</b>
            <br><br>
            <p>Spanish is the language that is most frequently spoken by immigrants who are 5 years old and older. Spanish is spoken at home by 42% of immigrants in the United States. English alone (only 17%) is the only language other than Spanish that immigrants speak at home. This is followed by Chinese (6%), Hindi (5%), Filipino/Tagalog (4%), and French (3%). Other languages have evolved in the US, most notably creoles and sign languages. The U.S. population speaks or signs in 430 different languages, 177 of which are local dialects. At least 52 of the 57 official languages of the nation are now extinct.</p>
            <br>
            <p>In 2018, 53% of immigrants aged 5 and older were fluent English speakers, either speaking it very well (37%) or only speaking English at home (17%). </p>
            <br>
            <p class="font-mono text-size-[10px] text-[#aaa]">
            Spanish (and Spanish Creole) has not been included in the bar chart as its usage rate is incomparably higher than all other languages.</p>
          </div>

          <div :style="{opacity: accordions[1].value ? '1' : '0'}" class="absolute font-sans text-[13px] leading-relaxed transition-all duration-500 ease-in-out opacity-100">
            <b class="text-[#7e6cfa] font-mono text-size-[20px]">Immigration Status</b>
            <br><br>
            <p>Not every legal permanent resident opts to become a citizen of the United States. After fulfilling certain qualifications, such as having resided in the United States for five years, those who desire to do so may submit an application. About 800,000 immigrants petitioned for citizenship during the 2019 fiscal year. Although the number of applications for naturalization has increased recently, the annual totals are still less than the 1.4 million applications submitted in 2007.</p>
            <br>
            <p>
              Most immigrants who are eligible for citizenship submit applications to become citizens. However, the rate of citizenship for legal immigrants from Mexico is the lowest overall. According to a 2015 Pew Research Center poll, Mexican-born green card holders' top justifications for not naturalizing include linguistic and interpersonal hurdles, and financial obstacles. </p>
            <br>
          </div>

          <div :style="{opacity: accordions[2].value ? '1' : '0'}" class="absolute font-sans text-[13px] leading-relaxed transition-all duration-500 animate-fade-in opacity-100">
            <b class="text-[#7e6cfa] font-mono text-size-[20px]">Educational Attainment</b>
            <br><br>
            <p>Diverse immigrant groups in the country, especially those from other regions of the world, have different levels of education. Compared to Americans who were born here, immigrants from Mexico and Central America are less likely to have completed high school (54% and 47%, respectively, compared to 8% of Americans who were born here). But when it came to having a bachelor's or higher degree, immigrants from every region—aside from Mexico, the Caribbean, and Central America—were as likely as or perhaps more so than U.S.-born residents. </p>
            <br>
            <p>
              South Asian immigrants were the ones most likely to have a bachelor's degree or above among all immigrants (71%). The least likely immigrants to hold a bachelor's degree or above were those from Mexico (7%) and Central America (11%) respectively.</p>
              <br>
              <p class="font-mono text-size-[10px] text-[#aaa]">
            For more info on the data aggregation:<br><a href="https://www.pewresearch.org/hispanic/wp-content/uploads/sites/5/2020/08/Pew-Research-Center_Countries-by-Regional-Classification_Statistical-Portrait-of-the-Foreign-Born-2018.pdf" class="underline">Countries by Regional Classification</a>.</p>

          </div>

          <div :style="{opacity: accordions[3].value ? '1' : '0'}" class="relative font-sans text-[13px] leading-relaxed transition-all duration-500 ease-in-out opacity-100">
            <b class="text-[#7e6cfa] font-mono text-size-[20px]">Home Ownership</b>
            <br><br>
            <p>Compared to native-born people, immigrants are less likely to own properties. Compared to more than two-thirds of those who are native-born, just around half of households who are foreign-born are homeowners.</p>
            <br>
            <p>Immigrants are disproportionately minorities and exhibit traits linked to lower rates of homeownership, such as lower income and educational levels, which may be one cause of the wide difference. Particularly, compared to 20.2% of native-born homes, 75.7% of foreign-born households are Latino, Black, or Asian. Another factor is that it takes time for immigrants to become homeowners; after around 20 years in the country, the chance of an immigrant becoming a homeowner is equal to that of a native-born homeowner.</p>
            <br>
              <p class="font-mono text-size-[10px] text-[#aaa]">
            For more info on the data aggregation:<br><a href="https://www.pewresearch.org/hispanic/wp-content/uploads/sites/5/2020/08/Pew-Research-Center_Countries-by-Regional-Classification_Statistical-Portrait-of-the-Foreign-Born-2018.pdf" class="underline">Countries by Regional Classification</a>.</p>

          </div>
        </div>
      </div>

      <footer class="flex gap-5 inset-x-0 mx-auto p-10 justify-center bg-white">
                  <button
                  class="bg-[#9edfe4] p-2 font-mono h-10 hover:(bg-[#7e6cfa] text-white) duration-300 disabled:(opacity-50) duration-300"
                  id="start"
                  @click="
                    playani = true;
                    startSlider();
                  "
                  :disabled="playani == true"
                >
                  {{ startButton }}
                </button>
                <button
                  class="bg-[#9edfe4] p-2 font-mono h-10 hover:(bg-[#7e6cfa] text-white) duration-300 disabled:(opacity-50) duration-300"
                  id="stop"
                  @click="
                    playani = false;
                    stopSlider();
                  "
                  :disabled="playani == false"
                >
                  Stop
                </button>
                <!-- <div id="time-slider"></div> -->
                <div class="pl-5"><vue-slider
                  v-model="year"
                  ref="timeSlider"
                  v-bind="options"
                  @change="sliderUpdated"
                /></div>
                </footer>

</div>

    <div class="flex flex-col gap-4 pt-5">
      <Accordion
        :open="LanguageChartAccordion"
        @click="accordionChange(0)"
        Title="Languages Spoken at Home"
      >
        <LanguageChart
          :year="year"
          :style="{ opacity: '1'}"
          class="relative pt-2 pb-2"
        ></LanguageChart>
      </Accordion>
    <Accordion
        :open="CitizenshipChartAccordion"
        @click="accordionChange(1)"
        Title="Immigration Status">
        <div class="chart-wrap">
          <div class="relative pt-5 " id="chart">
        <apexchart type="donut" width="480" :options="chartOptions" :series="series[year]"></apexchart>
      </div>

        <div class="relative text-right -top-5 pr-5 font-sans">{{ year }}</div>
        </div>
        
    </Accordion>
      <Accordion
        :open="EducationChartAccordion"
        @click="accordionChange(2)"
        Title="Educational Attainment"
      >
          <div class="relative pt-3" id="chart">
        <apexchart type="bar" height="350" :options="EduOptions" :series="Eduseries[year]"></apexchart>
      </div>
      
        </Accordion>
      <Accordion
        :open="HomeownershipChartAccordion"
        @click="accordionChange(3)"
        Title="Home Ownership"
      >
        <apexchart class="relative pt-0 pr-3 pl-3" height="350" :options="HomeOptions" :series="Homeseries[year]"></apexchart>
        
    </Accordion>
    <p class="font-mono text-size-[10px] text-[#aaa] text-right">
            Data by the <a href="https://www.pewresearch.org/hispanic/2020/08/20/facts-on-u-s-immigrants-trend-data/" class="underline">Pew Research Center</a> | Map by <a href="https://www.kirthi.cargo.site/" class="underline">Kirthi Balakrishnan</a></p>
    </div>
  </div>

</template>

<style scoped></style>

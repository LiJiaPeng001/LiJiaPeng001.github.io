---
layout: doc
---

<script setup>
import { ref, onMounted } from 'vue';
const chartElMei = ref(null);
const chartElYi = ref(null);
const chartElPeng = ref(null);

const meiData = [
  { "date": "2025/07/15", "weight": 149.20 },
  { "date": "2025/07/16", "weight": 148.20 },
  { "date": "2025/07/17", "weight": 147.90 },
  { "date": "2025/07/18", "weight": 148.40 },
  { "date": "2025/07/19", "weight": 149.00 },
  { "date": "2025/07/20", "weight": 147.70 },
  { "date": "2025/07/31", "weight": 147.60 },
  { "date": "2025/08/01", "weight": 149.40 },
  { "date": "2025/08/05", "weight": 150.20 },
  { "date": "2025/08/06", "weight": 150.20 },
  { "date": "2025/08/07", "weight": 149.40 },
  { "date": "2025/08/08", "weight": 150.00 },
  { "date": "2025/08/10", "weight": 149.80 },
  { "date": "2025/08/11", "weight": 150.40 },
  { "date": "2025/08/12", "weight": 149.00 },
  { "date": "2025/08/13", "weight": 149.40 }
]

const yiData = [
  { "date": "2025/07/15", "weight": 118.20 },
  { "date": "2025/07/16", "weight": 118.20 },
  { "date": "2025/07/17", "weight": 118.60 },
  { "date": "2025/07/18", "weight": 118.40 },
  { "date": "2025/07/19", "weight": 118.00 },
  { "date": "2025/07/20", "weight": 123.50 },
  { "date": "2025/07/28", "weight": 128.00 },
  { "date": "2025/07/29", "weight": 126.40 },  // 原数据本就是斤，直接保留
  { "date": "2025/07/30", "weight": 122.60 },  // 原数据本就是斤，直接保留
  { "date": "2025/07/31", "weight": 123.20 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/01", "weight": 122.00 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/02", "weight": 121.70 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/03", "weight": 121.50 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/04", "weight": 120.90 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/05", "weight": 120.70 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/06", "weight": 121.40 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/07", "weight": 120.80 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/08", "weight": 120.60 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/09", "weight": 120.80 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/10", "weight": 121.60 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/11", "weight": 120.90 },  // 原数据本就是斤，直接保留
  { "date": "2025/08/12", "weight": 121.10 }   // 原数据本就是斤，直接保留
]

onMounted(async () => {
  const echarts = await import('echarts');
  const chart = echarts.init(chartElMei.value);
  const chart1 = echarts.init(chartElYi.value);
  chart.setOption({
    xAxis: { type: 'category', data: meiData.map(it => it.date)},
    yAxis: { type: 'value' },
    series: [{ data: meiData.map(it => it.weight), type: 'line' }]
  });
  chart1.setOption({
    xAxis: { type: 'category', data: yiData.map(it => it.date)},
    yAxis: { type: 'value' },
    series: [{ data: yiData.map(it => it.weight), type: 'line' }]
  });
});
</script>

### 小梅
<div ref="chartElMei" style="height: 400px;"></div>

### 大丽
<div ref="chartElYi" style="height: 400px;"></div>
<div ref="chartElPeng" style="height: 400px;"></div>
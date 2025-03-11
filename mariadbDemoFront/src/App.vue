<template>
  <div class="container">
    <el-form :model="filters" label-width="120px">
      <el-form-item label="學生編號">
        <el-input v-model="filters.student_id" placeholder="學生編號"></el-input>
      </el-form-item>

      <el-form-item label="座位編號">
        <el-input v-model="filters.seat_id" placeholder="座位編號"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-select v-model="filters.sort" placeholder="選擇排序方式">
          <el-option label="預約編號" value="reservation_id"></el-option>
          <el-option label="學生編號" value="student_id"></el-option>
          <el-option label="座位編號" value="seat_id"></el-option>
          <el-option label="創建時間" value="create_time"></el-option>
        </el-select>
        <el-select v-model="filters.order" placeholder="選擇排序順序">
          <el-option label="升序" value="ASC"></el-option>
          <el-option label="降序" value="DESC"></el-option>
        </el-select>
      </el-form-item>

      <el-button @click="fetchReservations">篩選</el-button>
    </el-form>

    <el-table :data="reservations" border class="table">
      <el-table-column prop="reservation_id" label="預約編號" />
      <el-table-column prop="student_id" label="學生編號" />
      <el-table-column prop="seat_id" label="座位編號" />
      <el-table-column prop="timeslot_id" label="時段編號" />
      <el-table-column prop="create_time" label="創建時間" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Reservation } from './interfaces/Reservations';
import { asyncGet } from './utils/fetch';
import { apis } from './enum/api';

const filters = ref({
  student_id: '',
  seat_id: '',
  sort: 'reservation_id', // 預設排序
  order: 'ASC',
});

const reservations = ref<Array<Reservation>>([]);

const fetchReservations = async () => {
  try {
    // 準備 API 參數，只傳遞有值的篩選條件
    const params: Record<string, any> = {};
    if (filters.value.student_id) params.student_id = filters.value.student_id;
    if (filters.value.seat_id) params.seat_id = filters.value.seat_id;
    params.sort = filters.value.sort;
    params.order = filters.value.order;

    console.log("Filters being sent to API:", params);

    // 呼叫 asyncGet 來取得資料
    const resp = await asyncGet(apis.reservations, params);

    // 打印從 API 回傳的資料，檢查是否正確
    console.log("Reservations fetched from API:", resp);

    // 檢查資料是否為陣列
    if (Array.isArray(resp)) {
      reservations.value = resp;
    } else {
      console.error("Returned data is not an array", resp);
    }
  } catch (error) {
    // 捕捉錯誤並打印
    console.error("Error fetching reservations:", error);
  }
};

// 頁面載入後就呼叫一次 fetchReservations
onMounted(() => {
  fetchReservations();
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .table {
    width: 80%;
    height: 60%;
  }
}
</style>

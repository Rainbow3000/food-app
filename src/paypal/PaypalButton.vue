<script setup>
import { ref, onMounted, computed } from "vue";

const paypalButtonContainer = ref(null);

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});

const totalMoney = computed(() => parseFloat(props.total / 24545).toFixed(2));

const emit = defineEmits(["success"]);

onMounted(() => {
  if (window.paypal) {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalMoney.value, // Amount to be paid
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            emit("success", {
              address: details.payer.address.country_code,
              name: details.payer.name.given_name,
            });
          });
        },
      })
      .render(paypalButtonContainer.value);
  } else {
    console.error("PayPal SDK is not loaded!");
  }
});
</script>

<template>
  <div ref="paypalButtonContainer"></div>
</template>

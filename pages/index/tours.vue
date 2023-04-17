<template>
    <div class="tours">
        <div>
            <span class="circle-btn mx-auto mt-5 mb-4">
                <svgicon width="36" height="36" name="tour" />
            </span>
            <p class="text-weight-600 text-5 text-center mb-4 text-gray-50">
                به زودی
            </p>
            <p class="text-center text-gray-700 text-3">
                داریم روش کار می کنیم، صبور باشید
            </p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .circle-btn {
        background: $info;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        color: $white;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
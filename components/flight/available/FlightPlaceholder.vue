<template functional>
    <div :key="data.key" class="flight-placeholder d-flex flex-column">
        <div class="py-3 px-2">
            <span style="width: 120px;" />
            <span style="width: 60px; height: 12px;" />
        </div>

        <div class="flex-grow-1">
            <span class="mb-3" style="width: 100%; height: 90px;" />
            <span style="width: 100%; height: 90px;" />
        </div>

        <div class="clearfix py-3">
            <span class="float-right" style="width: 50px;" />
            <span class="float-left" style="width: 50px;" />
        </div>
    </div>
</template>

<style lang="scss">


.flight-placeholder {
    height: 340px;
    width: 100%;
    border: 1px solid #e0e0e0;
    margin-bottom: 20px;
    border-radius: 10px;

    span {
        background-color: #e0e0e0;
        height: 20px;
        display: inline-block;
        animation: flash infinite 800ms linear;
    }
}
</style>

<template>
    <div class="filter">
        <p class="filter__title mt-2 mb-0">
            مرتب سازی بر اساس
        </p>
        <div class="filter__tags">
            <button class="filter__tags__item">
                ارزان ترین
            </button>
            <button class="filter__tags__item">
                گران ترین
            </button>
            <button class="filter__tags__item">
                کوتاه ترین زمان
            </button>
            <button class="filter__tags__item">
                ارزان ترین
            </button>
        </div>
        <p class="filter__title mt-2 mb-0">
            بازه قیمت بلیط (تومان)
        </p>
        <div role="tablist">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <div v-b-toggle.accordion-1>
                        test
                    </div>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button v-b-toggle.accordion-2 block variant="info">
                        Accordion 2
                    </b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button v-b-toggle.accordion-3 block variant="info">
                        Accordion 3
                    </b-button>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FlightFilter'
}
</script>

<style lang="scss" scoped>
    .filter{
        &__title {
            color: map_get($gray-colors, 'gray-700');
            font-size: 0.9rem;
        }

        &__tags{
            padding: 20px 0;
            overflow: auto;
            text-align: right;
            white-space: nowrap;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            &__item{
                width: 120px;
                height: 40px;
                background: map_get($gray-colors, 'gray-200');
                border: 1px solid map_get($gray-colors, 'gray-400');
                border-radius: 10px;
                font-size: 0.9em;
                color: map_get($gray-colors, 'gray-800');
                font-weight: 500;
                text-align: center;
                outline: none;
                transition: all ease-out 250ms;

                &:not(:first-child){
                    margin-right: 10px;
                }

                &:hover, &:active{
                    color: $primary;
                    transition: all ease-out 250ms;
                    background: #e7def7;
                    border-color: $primary;
                    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
                    font-weight: 600;
                }
            }
        }
    }
</style>
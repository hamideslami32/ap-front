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
        <div role="tablist" class="accordion my-4">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                    <div v-b-toggle.accordion-1 class="accordion__header">
                        <div class="accordion__header__title">
                            <svgicon name="user" width="30" height="30" />
                            <span>ساعت پرواز</span>
                        </div>
                        <svgicon class="arrow" name="arrow-left" width="20" height="20" />
                    </div>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <span class="my-2">ساعت پرواز رفت</span>
                    <b-card-body class="d-flex justify-content-around px-2">
                        <div v-for="i in 4" :key="i" class="time-item">
                            <svgicon name="user" width="30" height="30" />
                            <span>بعدظهر</span>
                            <small>(۱۲ ظهر الی ۱۸)</small>
                        </div>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                    <div v-b-toggle.accordion-2 class="accordion__header">
                        <div class="accordion__header__title">
                            <svgicon name="user" width="30" height="30" />
                            <span>ایرلاین ها</span>
                        </div>
                        <svgicon class="arrow" name="arrow-left" width="20" height="20" />
                    </div>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                    <div v-b-toggle.accordion-3 class="accordion__header">
                        <div class="accordion__header__title">
                            <svgicon name="user" width="30" height="30" />
                            <span>انتخاب فرودگاه</span>
                        </div>
                        <svgicon class="arrow" name="arrow-left" width="20" height="20" />
                    </div>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                    <div v-b-toggle.accordion-4 class="accordion__header">
                        <div class="accordion__header__title">
                            <svgicon name="user" width="30" height="30" />
                            <span>کلاس پروازی</span>
                        </div>
                        <svgicon class="arrow" name="arrow-left" width="20" height="20" />
                    </div>
                </b-card-header>
                <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
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
    .filter {
        &__title {
            color: map_get($gray-colors, 'gray-700');
            font-size: 0.9rem;
        }

        &__tags {
            padding: 20px 0;
            overflow: auto;
            text-align: right;
            white-space: nowrap;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            &__item {
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

                &:not(:first-child) {
                    margin-right: 10px;
                }

                &:hover, &:active {
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

    .accordion {
        margin: 0 -10px;

        .card {
            border: none;
            background: map_get($gray-colors, 'gray-200');
            box-shadow: none;
            padding: 0;

            .card-header {
                background: map_get($gray-colors, 'gray-200');
                padding: 0;
            }

            .time-item {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 15px 10px 10px 10px;
                background: #f9f9f9;
                border: 1px solid map_get($gray-colors, 'gray-400');
                border-radius: 10px;
                transition: all ease 250ms;
                svg {
                    color: map_get($gray-colors, 'gray-700');
                }

                span {
                    color: map_get($gray-colors, 'gray-800');
                    font-size: 0.9em;
                }

                small {
                    font-size: 9px;
                    color: map_get($gray-colors, 'gray-700');
                }

                &:focus, &:hover, &:active {
                    background: #e7def7;
                    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.05);
                    border-color: $primary;

                    span, svg, small {
                        color: $primary;
                    }
                    span{
                        font-weight: 500;
                    }
                }
            }
        }

        &__header {
            display: flex;
            background: map_get($gray-colors, 'gray-200');
            border-top: 1px solid map_get($gray-colors, 'gray-500');
            padding: 20px 10px;
            align-items: center;
            justify-content: space-between;

            &.not-collapsed, &.show {
                > .arrow {
                    transform: rotate(-90deg);
                    transition: all ease-in-out 250ms;
                }
            }

            &:focus, &:active {
                outline: none;
            }

            &__title {
                svg {
                    color: map_get($gray-colors, 'gray-300');
                }

                span {
                    font-size: 0.9em;
                    font-weight: 600;
                    color: map_get($gray-colors, 'gray-800');
                }
            }

            > svg {
                color: map_get($gray-colors, 'gray-800');

            }
        }
    }
</style>
module.exports = {
    plugins: [
        {
            removeAttrs: {
                fill: true,
                stroke: true
            }
        },
        {
            removeTitle: true
        },
        {
            inlineStyles: false
        },
        {
            convertStyleToAttrs: true
        },
        {
            removeStyleElement: true
        },
        {
            removeComments: true
        },
        {
            removeDesc: true
        },
        {
            removeUselessDefs: true
        },
        {
            cleanupIDs: {
                remove: true,
                prefix: 'svgicon'
            }
        },
        {
            convertShapeToPath: true
        }
    ]
}
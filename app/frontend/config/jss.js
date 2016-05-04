import jss from 'jss'
import extend from 'jss-extend'
import nested from 'jss-nested'
import camelCase from 'jss-camel-case'
import defaultUnit from 'jss-default-unit'
import vendorPrefixer from 'jss-vendor-prefixer'
import jssProps from 'jss-props-sort'

jss.use(extend()).
    use(nested()).
    use(camelCase()).
    use(defaultUnit()).
    use(vendorPrefixer()).
    use(jssProps())

export default jss

import RestException from './RestException'

export default class ImmutablePropertyException extends RestException {
    propertyName: string

    constructor(propertyName: string) {
        super()

        this.propertyName = propertyName
        this.message = `Property "${propertyName}" is immutable.`
    }
}
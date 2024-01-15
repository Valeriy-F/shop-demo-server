import RestException from './RestException'

export default class MissedRequiredPropertiesException extends RestException {
    requiredProperties: string[]
    missedProperties: string[]

    constructor(requiredProperties: string[], missedProperties: string[]) {
        super()

        this.requiredProperties = requiredProperties
        this.missedProperties = missedProperties
        this.message = `Properties "${this.propertiesToString(requiredProperties)}" are required. Missed properties: "${this.propertiesToString(missedProperties)}"`
    }

    private propertiesToString(properties: string[]): string {
        return properties.join('", "')
    }
}
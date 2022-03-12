export default function validator(data, config) {
    const errors = {}

    const validate = (item, config, rule, itemName) => {
        switch (rule) {
            case 'isRequired':
                if (item.value.length === 0) {
                    errors[itemName] = config[rule].mesage
                }
                break
            case 'isEmail':
                if (
                    !errors[itemName] &&
                    !/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(
                        item.value.trim()
                    )
                ) {
                    errors[itemName] = config[rule].mesage
                }
                break
            case 'isCapital':
                if (!errors[itemName] && !/[A-Z]/.test(item.value.trim())) {
                    errors[itemName] = config[rule].mesage
                }
                break
            case 'isNumber':
                if (!errors[itemName] && !/[0-9]/.test(item.value.trim())) {
                    errors[itemName] = config[rule].mesage
                }
                break
            case 'isLength':
                if (!errors[itemName] && item.value.length < 8) {
                    errors[itemName] = config[rule].mesage
                }
                break
        }
    }

    for (const item in data) {
        for (const rule in config[item]) {
            validate(data[item], config[item], rule, item)
        }
    }

    return errors
}

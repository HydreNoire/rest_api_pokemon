const TYPES_VALUES = ['Plante', 'Insecte', 'Feu', 'Eau', 'Poison', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris.'
            },
            validate: {
                notEmpty: { msg: "Le nom du pokémon est obligatoire." },
                notNull: { msg: 'Le nom est une propriété requise.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de vie." },
                notNull: { msg: 'Les points de vie sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: 'Les points de vie ne peuvent pas être en dessous de 0'
                },
                max: {
                    args: [999],
                    msg: 'Les points ne de vie ne peuvent excéder 999 points de vie.'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Utilisez uniquement des nombres entiers pour les pc." },
                notNull: { msg: 'Les pc sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: 'Les pc ne peuvent pas être en dessous de 0'
                },
                max: {
                    args: [99],
                    msg: 'Les pc ne peuvent excéder 99.'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: { msg: "Vous devez renseigner une URL valide pour l'image du pokémon." },
                notNull: { msg: 'L\'image du pokémon une propriété requise.' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Un pokémon doit avoir au moins un type');
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokémon ne peut avoir plus de 3 types');
                    }
                    value.split(',').forEach(type => {
                        if (!TYPES_VALUES.includes(type)) {
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${TYPES_VALUES}`)
                        }
                    });
                }
            }
        },
    }, {
        timestamp: true,
        createdAt: 'created',
        updatedAt: false
    })
}
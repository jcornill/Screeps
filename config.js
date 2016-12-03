// ----- MEMORY INFO -----
// Memory.HaulerTarget[] - array contains the name of the mineur that have a provider
// Memory.StaticMineur[] - array contain the name of the static mineur
// Memory.MiningSourcesRoomName[] - array contains the roomName of the miningsources
// Memory.MiningSourcesId[] - array contains the pos of the miningsources
// Memory.ScoutedMap[] - array that contains the scout name for scoutingMap
// Memory.ReservingMap[] - array
// -----------------------
// Memory.DefendPos - a pos where the defender need to go
// ----- BUILDER -----
// memory.working - a bool if the creep is go to work or if his go to storage
// ----- CLAIMER -----
// ----- DEFENDER -----
// ----- HARVESTER -----
// memory.working - a bool if the creep is go to work or if his go to storage
// ----- HAULER -----
// memory.working - a bool if the creep is go to work or if his go to storage
// ----- PROVIDER -----
// memory.provideId - a int that contains this id of the static Mineur in the Memory.StaticMineur
// ----- REPAIR -----
// memory.working - a bool if the creep is go to work or if his go to storage
// ----- SCOUT -----
// memory.scoutId - a int that contains this id of the name to scout
// ----- SMINER -----
// memory.miningId - a int that contains the id of the source to mine
// ----- UPGRADER -----
// memory.working - a bool if the creep is go to work or if his go to storage
module.exports =
{
	playerName: "kirthos",
    mainStorage: "761e6384b86a193",
    miningdata:
    {
        miningsources: ["68050773313e4cb", "9fa9077331385d3"],
    },
    mapData:
    {
        mainRoom: "W5N8",
		scoutingMap: ["W5N8", "W5N7", "W6N8", "W5N9"],
		claimMap: ["W5N8", "W5N7"],
		reservingMap: ["W6N8"],
    },
	// TODO: Ratio of unit depending on the room controller
	ratioSpawnPerRoom:
	{
		HARVESTERS: 0.75,
		UPGRADERS: 0.75,
		BUILDERS: 0.75, //TODO: change to spawn global
		HAULERS: 0.75,
	},
	// TODO: change to spawnGlobal
    spawner:
    {
        // 0 = no spawn
		// -1 auto calc depending on mapData
        MAX_SCOUTS: -1,
        MAX_SMINERS: -1,
        MAX_PROVIDERS: -1,
		MAX_DEFENDERS: 2,
		MAX_LINKERS: 1, // TODO: change to spawn per room
    },
	bodyPartRatio:
	{
		harvester:
		{
			parts: [WORK, CARRY, MOVE],
			ratio: [1, 1, 1],
			ratioLimit: 8, // 1600 23
			ratioMin: 1,
		},
		upgrader:
		{
			parts: [WORK, CARRY, MOVE],
			ratio: [1, 1, 1],
			ratioLimit: 5, // 1000 15
			ratioMin: 1,
		},
		builder:
		{
			parts: [WORK, CARRY, MOVE],
			ratio: [1, 1, 1],
			ratioLimit: 8, // 1600 23
			ratioMin: 1,
		},
		hauler:
		{
			parts: [WORK, CARRY, MOVE],
			ratio: [1, 1, 1],
			ratioLimit: 5, // 1000 15
			ratioMin: 2,
		},
	},
	// TODO: Hard coded (changed to bodyPartRatio)
    bodyPart:
    {
        //harvester: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        harvester: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //1000 15
        upgrader: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],  //1000 15
        builder: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],   //1000 15
        hauler: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],    //1000 15
        scout: [MOVE], //50 1
        sminer: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //1150 18
        provider: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], //1000 20
	    defender: [TOUGH, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, MOVE], // 450 8
		claimer: [CLAIM, MOVE], //650 2
		linker: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], // 400 8
	},
    workPriority:
    {
        harvester: ["harvest"],
        upgrader: ["upgrade"],
        //builder: ["build", "repair", "upgrade"],
        builder: ["repair", "build"],
        hauler: ["haul", "upgrade"],
        //hauler: ["upgrade"],
        scout: ["scout"],
        sminer: ["sminer"],
        provider: ["provider"],
		defender: ["defend"],
		claimer: ["claim"],
		linker: ["link"],
    },
    buildPriority:
    {
        1: STRUCTURE_EXTENSION,
        2: STRUCTURE_ROAD,
    },
    repairPriority:
    {
        1: STRUCTURE_TOWER,
        2: STRUCTURE_EXTENSION,
        3: STRUCTURE_ROAD,
    }
};

type LevelV = {
    title: string;
    help: string;
    SelectItem: {
      AllItem: Record<string, string>|Record<string, any>;
      TrueItem: Record<string, string>;
      CorrectAnswer: string,
    };
  };
  
const levelVariable: LevelV[]= [
  {
    title: "Select the plate",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "bento",
        item2: "plate",
        item3: "plate",
        item4: "bento",
      },
      TrueItem: {
        item2: "plate",
        item3: "plate",
      },
      CorrectAnswer: "plate",
    },
  },
  {
    title: "Select the fancy",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "bento",
        item2: "fancy",
        item3: "plate",
        item4: "fancy",
      },
      TrueItem: {
        item2: "fancy",
        item4: "fancy",
      },
      CorrectAnswer: "fancy",
    },
  },
  {
    title: "Select the  plate",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: { bento: "plate"},
        item2: "plate",
        item3: "plate",
        item4: "bento",
      },
      TrueItem: {
        item1: "plate",
      },
      CorrectAnswer: "bento>plate",

    },
  },
  {
    title: "Select all even plates",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "plate",
        item2: "plate",
        item3: "plate",
        item4: "plate",
      },
      TrueItem: {
        item2: "plate",
        item4: "plate",
      },
      CorrectAnswer: "plate:nth-child(even)",

    },
  },
  {
    title: "Select the 2rd plate",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "plate",
        item2: "plate",
        item3: "fancy",
        item4: "plate",
      },
      TrueItem: {
        item2: "plate",
      },
      CorrectAnswer: "plate:nth-child(2)",
    },
  },
  {
    title: "Select all",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "apple",
        item2: "orange",
        item3: "plate",
        item4: "fancy",
      },
      TrueItem: {
        item1: "apple",
        item2: "orange",
        item3: "plate",
        item4: "fancy",
      },
      CorrectAnswer: "*",
    },
  },
  {
    title: "Select the orange",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: { bento: "apple"},
        item2: { bento: "orange"},
        item3: { bento: "apple"},
        item4: { bento: "orange"},
      },
      TrueItem: {
        item2: "orange",
        item4: "orange",
      },
      CorrectAnswer: "bento>orange",
    },
  },
  {
    title: "Select pickle in the plate&bento",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "pickle",
        item2: { bento: "pickle"},
        item3: { plate: "pickle"},
        item4: { apple: "pickle"},
      },
      TrueItem: {
        item2: "pickle",
        item3: "pickle",
      },
      CorrectAnswer: "bento>pickle,plate>pickle",
    },
  },
  {
    title: "Select first orange",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "apple",
        item2: "orange",
        item3: "orange",
        item4: { bento: "orange"},
      },
      TrueItem: {
        item2: "orange",

      },
      CorrectAnswer: "orange:first-of-type",
    },
  },
  {
    title: "Select the empty bentos",
    help: "Help",
    SelectItem: {
      AllItem: {
        item1: "bento",
        item2: { bento: "orange"},
        item3: "plate",
        item4: "bento",
      },
      TrueItem: {
        item1: "bento",
        item4: "bento",
      },
      CorrectAnswer: "bento:empty"
    },
  },
];
export default levelVariable;

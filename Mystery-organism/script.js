// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//factory function
function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    mutate() {
      const newDna = this.dna.map(el => {
        let newEl = returnRandBase();
        while (el === newEl) {
          newEl = returnRandBase();
        }
        return newEl;
      });
      return newDna;
    },
    compareDNA(pAequor) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        for (let j = 0; j < pAequor.dna.length; j++) {
          if (i == j && this.dna[i] === pAequor.dna[j]) {
            count++;
          }
        }
      }
      const percentage = ((count / dna.length) * 100).toFixed(2);

      console.log(
        `specimen ${specimenNum} and specimen ${pAequor.specimenNum} have ${percentage}% DNA in common`
      );
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === "C" || el === "G");

      const percentage = (cOrG.length / this.dna.length) * 100;
      return percentage > 60 ? true : false;
    }
  };
}

const newDna = pAequorFactory(23, mockUpStrand());
console.log("==============MUTATE===================");
console.log("----origin---");
console.log(newDna.dna);
console.log("----mutate---");
console.log(newDna.mutate());

const pAequor1 = pAequorFactory(10, mockUpStrand());
const pAequor2 = pAequorFactory(20, mockUpStrand());

console.log("=============COMPARE=================");
console.log(newDna);
console.log(pAequor1);
newDna.compareDNA(pAequor1);

console.log("=============Survive=================");
console.log(newDna.willLikelySurvive());

// create 30 instances of pAequor than can survive
const canSurvive = [];
let num = 100;
while (canSurvive.length < 30) {
  const genDna = pAequorFactory(num, mockUpStrand());
  if (genDna.willLikelySurvive()) {
    canSurvive.push(genDna);
    num++;
  }
}
console.log("=============Survive Array=================");
console.log(canSurvive);

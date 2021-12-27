const { Machine, interpret } = require('xstate');

const recommendsXstate=(user)=>{
        if(user.family==0){
            const single = Machine({
                id: 'driving',
                initial: 'driving',
                context: {
                retries: 0
                },
                states: {
                driving: {
                    on: {
                    havedriving: 'have',
                    nothavedriving: 'not',
                    }
                },
                have: {
                  on: {
                        age18: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        age1840:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        age40:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                not: {  
                    on: {
                        age18: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        age1840:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        age40:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                    
                },
                suceed:{
                  type:'final'
                }
                }
            });
            //job
            const job = Machine({
                initial: 'job',
                states: {
                job: {
                    on: {
                    Student: 'Student',
                    Employee: 'Employee',
                    SelfEmployee: 'SelfEmployee',
                    Officer: 'Officer',
                    Doctor: 'Doctor',
                    Pensioner: 'Pensioner',
                    Jobless: 'Jobless',
                    }
                },
                Student: {
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                /*cond: (event) => {event.data.income<1000}
                actions: [console.log('cond1 chosen!') ],
                cond: 'cond2',
                actions: [console.log('cond2 chosen!') ],
                cond: 'cond3',
                actions: [console.log('cond3 chosen!') ],*/
                },
                Employee: {  
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                SelfEmployee: {
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                Officer: {  
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                Doctor: {  
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                Pensioner: {
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                Jobless: { 
                  on: {
                        incomeS1000: {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB1000S3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                        incomeB3000:  {
                          target:'suceed',
                            actions: console.log('insurance...')
                        },
                  },   
                },
                
                suceed:{
                  type:'final'
                }
                }
                });
            /*
        switch(user.jobid){
            case "Student": {user.jobid="1";break;}
            case "Employee": {user.jobid="2";break;}
            case "Self-Employee": {user.jobid="3";break;}
            case "Officer": {user.jobid="4";break;}
            case "Doctor": {user.jobid="5";break;}
            case "Pensioner": {user.jobid="6";break;}
            case "Jobless": {user.jobid="7";break;}
        };*/
        //child 
        const child = Machine({
            id: 'fetch',
            initial: 'child',
            states: {
              child: {
                on: {
                  ageS16: 'ageS16',
                  ageB16: 'ageB16'
                }
              },
              ageS16: {
                actions: console.log('insurance...'),
                on:{
                success:'success'
                },
              },
              ageB16: {
                 actions: console.log('insurance...'),
               on:{
                success:'success'
                },
              },
              success: {
                type: 'final'
              },
             
            }
          });
          
          //
        if(user.dentist || user.glass || user.neuropathy || user.smoke){
            console.log("Krankenzusatz,Krankentagegeld,Berufsunfaehigkeit");
        }
        if(user.sleephospital){
            console.log("Krankenhauszusatz");
        }
        if(user.diabetic){
            console.log("Krankenzusatz,Krankentagegeld,Berufsunfaehigkeit,RisikoLebensversicherung für Diabetiker");
        }
        if(user.pet){
            console.log("Tierkrank,Tierhaftpflicht");
        }

        //Machine for hobbies       
        const createHobbiesMachine=Machine({
                    id: "hobbies",
                    initial: "idle",
                
                    states: {
                        idle: {
                            on: {
                                Travel: {
                                actions:  console.log('activating...')
                                },
                                EXTREMSPORT: {
                                actions:  console.log('activating...')
                                },
                                Horseriding: {
                                actions:  console.log('activating...')
                                },
                                Cooking: {
                                    actions:  console.log('activating...')
                                },
                            }
                        }
                    }
        });
    }
        else{
            const family = Machine({
                id: 'driving',
                initial: 'idle',
                context: {
                retries: 0
                },
                states: {
                idle: {
                    on: {
                    driving: 'loading'
                    }
                },
                loading: {
                    on: {
                    havedriving: 'have',
                    nothavedriving: 'not'
                    }
                },
                have: {
                    on: {
                        age18: {
                            actions: console.log('activating...')
                        },
                        age1840: {
                            actions: console.log('activating...')
                        },
                        age40: {
                            actions:  console.log('activating...')
                        }
                        }
                },
                not: {  
                    on: {
                    age18: {
                        actions: console.log('activating...')
                    },
                    age1840: {
                        actions: console.log('activating...')
                    },
                    age40: {
                        actions:  console.log('activating...')
                    }
                    }
                }
                }
            });
        };

};
export default recommendsXstate;
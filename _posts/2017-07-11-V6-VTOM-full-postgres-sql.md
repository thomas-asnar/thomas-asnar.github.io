```sql
--
-- sgbd/bin/psql -p <portsgbd> -d "vtom" -U "vtom"
/*
 Schema |                  Name                  |   Type   | Owner
--------+----------------------------------------+----------+-------
 public | vt_accounts                            | table    | vtom
 public | vt_alarm_properties                    | table    | vtom
 public | vt_alarms                              | table    | vtom
 public | vt_analyze_filter                      | table    | vtom
 public | vt_calendars                           | table    | vtom
 public | vt_col_collections                     | table    | vtom
 public | vt_col_snapshots                       | table    | vtom
 public | vt_core_applications                   | table    | vtom
 public | vt_core_calendars                      | table    | vtom
 public | vt_core_context_variables              | table    | vtom
 public | vt_core_contexts                       | table    | vtom
 public | vt_core_date_blocking_jobs             | table    | vtom
 public | vt_core_dates                          | table    | vtom
 public | vt_core_environments                   | table    | vtom
 public | vt_core_environments_used_calendars    | table    | vtom
 public | vt_core_environments_used_contexts     | table    | vtom
 public | vt_core_environments_used_dates        | table    | vtom
 public | vt_core_environments_used_hosts_groups | table    | vtom
 public | vt_core_environments_used_periods      | table    | vtom
 public | vt_core_environments_used_queues       | table    | vtom
 public | vt_core_environments_used_resources    | table    | vtom
 public | vt_core_environments_used_users        | table    | vtom
 public | vt_core_expected_resources             | table    | vtom
 public | vt_core_hosts                          | table    | vtom
 public | vt_core_hosts_groups                   | table    | vtom
 public | vt_core_hosts_groups_hosts             | table    | vtom
 public | vt_core_intervals                      | table    | vtom
 public | vt_core_job_occs                       | table    | vtom
 public | vt_core_job_parameters                 | table    | vtom
 public | vt_core_jobs                           | table    | vtom
 public | vt_core_links                          | table    | vtom
 public | vt_core_objects                        | table    | vtom
 public | vt_core_periods                        | table    | vtom
 public | vt_core_plannings                      | table    | vtom
 public | vt_core_queues                         | table    | vtom
 public | vt_core_resources                      | table    | vtom
 public | vt_core_resources_date                 | table    | vtom
 public | vt_core_resources_extern               | table    | vtom
 public | vt_core_resources_extern_parameters    | table    | vtom
 public | vt_core_resources_file                 | table    | vtom
 public | vt_core_resources_generic              | table    | vtom
 public | vt_core_resources_generic_parameters   | table    | vtom
 public | vt_core_resources_numeric              | table    | vtom
 public | vt_core_resources_stack                | table    | vtom
 public | vt_core_resources_text                 | table    | vtom
 public | vt_core_resources_weight               | table    | vtom
 public | vt_core_tokens                         | table    | vtom
 public | vt_core_users                          | table    | vtom
 public | vt_deployment_repositories             | table    | vtom
 public | vt_domain_counter                      | sequence | vtom
 public | vt_domains                             | table    | vtom
 public | vt_graph_default_properties            | table    | vtom
 public | vt_graph_links                         | table    | vtom
 public | vt_graph_nodes                         | table    | vtom
 public | vt_graph_object_properties             | table    | vtom
 public | vt_graph_pins                          | table    | vtom
 public | vt_graphs                              | table    | vtom
 public | vt_histo                               | table    | vtom
 public | vt_histo_counter                       | sequence | vtom
 public | vt_histo_date_count                    | table    | vtom
 public | vt_holidays                            | table    | vtom
 public | vt_holidays_groups                     | table    | vtom
 public | vt_holidays_groups_holidays            | table    | vtom
 public | vt_icons                               | table    | vtom
 public | vt_ihm_desktops                        | table    | vtom
 public | vt_ihm_desktops_dispositions           | table    | vtom
 public | vt_instructions                        | table    | vtom
 public | vt_job_application_server_properties   | table    | vtom
 public | vt_job_application_servers             | table    | vtom
 public | vt_jobs                                | table    | vtom
 public | vt_license_entries                     | table    | vtom
 public | vt_objects_alarms                      | table    | vtom
 public | vt_objects_instructions                | table    | vtom
 public | vt_profiles                            | table    | vtom
 public | vt_profiles_accounts                   | table    | vtom
 public | vt_profiles_rights                     | table    | vtom
 public | vt_properties                          | table    | vtom
 public | vt_resources                           | table    | vtom
 public | vt_rights                              | table    | vtom
 public | vt_stats_current                       | table    | vtom
 public | vt_stats_date_count                    | table    | vtom
 public | vt_stats_job                           | table    | vtom
 public | vt_stats_job_counter                   | sequence | vtom
 public | vt_stats_realtime                      | table    | vtom
 public | vt_tdf_lots                            | table    | vtom
 public | vt_tdf_lots_receive                    | table    | vtom
 public | vt_tdf_lots_receive_counter            | sequence | vtom
 public | vt_tdf_lots_send                       | table    | vtom
 public | vt_tdf_lots_send_counter               | sequence | vtom
 public | vt_tdf_lots_transfer                   | table    | vtom
 public | vt_tdf_rules                           | table    | vtom
 public | vt_tdf_rules_groups                    | table    | vtom
 public | vt_tdf_rules_groups_rules              | table    | vtom
 public | vt_tdf_sites                           | table    | vtom
 public | vt_views                               | table    | vtom
 public | vt_web_desktops                        | table    | vtom
 public | vt_web_desktops_dispositions           | table    | vtom

 vt_core_jobs
 vtenvsid|vtappsid|vtjobsid|vtid|vtname|vtcomment|vtexploited|vtpriorityenabled|vtpriority|vtfamily|vtscript|vtfrequency|vtondemand|vtcycleenabled|vtcycle|vtminstart|vtmaxstart|vtmaxlength|vtexecmode|vthostsgroupid|vtqueueid|vtuserid|vtappinerror|vtdesconerror|vtdescafter|vtblockdate|retrytype|vtretrymax|vtretryscript|vtlogprint|vtlogremove|vtlogcopy|vtalarmfatale|vtalarmsevere|vtalarminfo|vteventwait|vteventrunning|vteventfinished|vteventunscheduled|vteventerror|vteventdescheduled|vtmovementtime|vtjobtype|vtjobapplicationserversid|vtlogsretention|vtstatus|vtipid|vtistsend|vttsendflag|vtisretry|vtretrycount|vtretrystep|vtmessage|vttimebegin|vttimeend|vtisretained|vtisasked|vtlastrun|vtlaststop|vtlaststatus|vtforcestatus|vtexecutionstate|vtbegindate|vtenddate|vtrefjobsid
*/
--

select 	
		e.vtname as vtenvname,
		a.vtname as vtappname,
		j.vtname as vtjobname,
		j.vtscript,
		array_to_string(
			array(
				select vtposition || ':' || vtvalue -- est ce que le numero param est vraiment utile si order by vtposition
				from vt_core_job_parameters p
				where p.vtjobsid = j.vtjobsid
				order by vtposition
			),
			' ' -- separator entre les parametres
		) as vtparameters,
		h.vtname as vthostname,
		q.vtname as vtqueuename,
		u.vtname as vtusername,
		coalesce(j.vtcomment,a.vtcomment) as vtcomment,
		to_char((coalesce(j.vtminstart,a.vtminstart) || ' second')::interval, 'HH24:MI:SS') as vtminstart,
		case
			when (coalesce(j.vtmaxstart,a.vtmaxstart) = 86399) then	'Illimité'
			else to_char((coalesce(j.vtmaxstart,a.vtmaxstart) || ' second')::interval, 'HH24:MI:SS')
		end
			as vtmaxstart
from vt_core_jobs j
left join vt_core_environments e on e.vtsid = j.vtenvsid
left join vt_core_applications a on a.vtappsid = j.vtappsid
left join vt_core_queues q on q.vtid = j.vtqueueid
left join vt_core_users u on u.vtid = j.vtuserid
left join vt_core_hosts_groups h on coalesce(j.vthostsgroupid, a.vthostsgroupid, e.vthostgroupid) = h.vtid
-- where 
	-- e.vtname = 'ADAM'
;
```
